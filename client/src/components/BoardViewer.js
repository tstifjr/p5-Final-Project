import React, { useEffect, useContext, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { UserContext } from '../context/user'
import { SquaresContext } from '../context/squares';
import BoardUI from './BoardUI'
import { Container, Button, ButtonGroup } from 'react-bootstrap'
import { patchItem, initializeBoard } from '../globalFunctions'
function BoardViewer() {
    const { user, setUser } = useContext(UserContext)
    const { squares, setSquares } = useContext(SquaresContext)
    const [board, setBoard] = useState(null)
    const [edit, setEdit] = useState(false)
    const [locked, setLocked] = useState(false)

    useEffect(() => {
        fetch('/boards/1')
            .then(r => r.json())
            .then(board => {
                setBoard(board)
                setEdit(board.colnums)
            })
    }, [setBoard])

    useEffect(() => {
        fetch('/squares').then(r => {
            if (r.ok) {
                r.json()
                    .then(data => {
                        setSquares(data)
                    })
            }
        })
    }, [setSquares])

    const handleFillBoard = () => {
        //Send SPECIAL POST REQUEST TO FILL OUT BOARD
        const [boardArr, emSqArr] = initializeBoard(squares)
        const data = { "empty_squares": emSqArr }
        fetch('/fillboard', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data, null, 2),
        }).then(r => {
            if (r.ok) {
                r.json().then(filledSquares => setSquares([...squares, ...filledSquares]))
            }
            else {
                r.json().then(res => console.log(res))
            }
        })
    }

    const assignSquares = () => {
        const row = genRandNums()
        const col = genRandNums()

        const boardData = { "rownums": row.toString(), "colnums": col.toString() }
        patchItem(board, boardData, `/boards/${board.id}`)
        setBoard({ ...board, rownums: row.toString(), colnums: col.toString() })

        //PAtch ALL on backend
        const updatesForAllSq = squares.map(square => {
            const set_row_num = row[Math.floor(square.board_pos / 10)]
            const set_col_num = col[(square.board_pos % 10)]
            return { "id": square.id, "row_num": set_row_num, "col_num": set_col_num }
        })
        // console.log(updatesForAllSq)
        fetch(`/squares`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatesForAllSq),
        }).then(r => {
            if (r.ok) {
                r.json().then(updatedSquares => setSquares(updatedSquares))
            }
        })
    }

    const handleResetBoard = () => {

        //clear board nums 
        const boardData = { "rownums": null, "colnums": null, "game_cnt": 0 }
        patchItem(board, boardData, `/boards/${board.id}`)
        setBoard({ ...board, rownums: null, colnums: null })

        //scrub both
        fetch('/scrubboard', {
            method: "DELETE"
        }).then(r => {
            if (r.ok) {
                r.json().then(data => {
                    setSquares(data[0])
                    // setGames(data[1])
                })
            }
        })
    }

    const handleClearBoard = () => {
        handleResetBoard()
        ///// Send Delete All request to clear board
        fetch('/squares', {
            method: "DELETE"
        })
            .then(r => {
                if (r.status === 204) {
                    setSquares([])
                    initializeBoard([])
                }
            })
    }

    return (
        user ? <div>
            <Container className='text-center d-flex justify-content-between mt-5 pb-3' style={{marginLeft:"5%", maxWidth:"93%"}}>
                <ButtonGroup className='me-5'>
                    {!locked ? <Button className='btn-success' onClick={() => setLocked(!locked)}>Lock Board</Button> : <Button className='btn-danger' onClick={() => setLocked(!locked)}>Unlock</Button>}
                    {!locked && !board?.colnums && (!edit ? <Button className='justify-content-end' onClick={() => setEdit(!edit)}>Edit Board</Button> : <Button className='justify-content-end' onClick={() => setEdit(!edit)}>View Board</Button>)}
                    <Button className='btn-danger' onClick={handleClearBoard} disabled={!squares?.length}>Clear Board</Button>
                </ButtonGroup>

                {locked &&
                    <ButtonGroup className='ms-5 me-5'>
                        <Button className='btn-info' onClick={handleFillBoard} disabled={squares?.length === 100}>Fill Board</Button>
                        <Button className='btn-success' onClick={assignSquares} disabled={squares?.length !== 100 || board?.colnums}>Assign Numbers To Board</Button>
                        <Button className='btn-warning' onClick={handleResetBoard} disabled={!board || !board?.colnums} >ResetBoard</Button>
                    </ButtonGroup>}

            </Container>

            <Container className='overflow-auto gx-0' style={{maxWidth:"90%", maxHeight:"77vh"}}>
                <BoardUI squares={squares} board={board} edit={edit} />
            </Container>
        </div>
            :
            <div></div>

    )
}

export default BoardViewer


function genRandNums() {
    const hashmap = new Map();
    let i = 0;
    while (hashmap.size < 10) {
        let r = Math.floor(Math.random() * 10)
        hashmap.set(r, i)
        i++
    }
    return Array.from(hashmap.keys())
}