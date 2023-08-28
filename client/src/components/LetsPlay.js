import React, { useState, useContext, useEffect } from 'react'
import Col from 'react-bootstrap/Col'
import { Row, Button, Container, Table, ButtonGroup, Card} from 'react-bootstrap'
import { SquaresContext } from '../context/squares';
import GameUI from './GameUI';
import { patchItem, initializeBoard } from '../globalFunctions'
import BoardUI from './BoardUI';
import '../index.css';

function LetsPlay() {
    const { squares, setSquares } = useContext(SquaresContext)
    const [show, setShow] = useState(false)
    const [board, setBoard] = useState(null)

    useEffect(() => {
        fetch('/boards/1')
            .then(r => r.json())
            .then(board => setBoard(board))
    }, [])


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

    const handleResetBoard = () => {

        //clear nums 
        const boardData = { "rownums": null, "colnums": null, "game_cnt": 0 }
        patchItem(board, boardData, `/boards/${board.id}`)
        setBoard({ ...board, rownums: null, colnums: null })
        console.log(board)
        //Set the games to have no square with a edit delete
        fetch(`/scrubgames`, {
            method: "DELETE",
        }).then(r => {
            if (r.ok) { }
        })
    }

    const handleClearBoard = () => {
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

        //Individual Patch seems slow
        // const copy = [...squares]
        // const edited_copy = copy.map(square => {
        //     const set_row_num = row[Math.floor(square.board_pos / 10)]
        //     const set_col_num = col[(square.board_pos % 10)]
        //     const updateSquare = { "row_num": set_row_num, "col_num": set_col_num }
        //     return patchItem(square, updateSquare, `/squares/${square.id}`)
        // })
        // setSquares(edited_copy)
    }

    return (
        <>
            <Row>
                <Col xs={3} className='ms-1'>
                    {/* <Row className='justify-content-center'>
                        <div>Menu Buttons Go Here</div>
                        <Button className='w-50' onClick={() => setShow(!show)}>Display Game Board</Button>
                    </Row> */}
                    <Row className='justify-content-center'>
                        {board && !board.colnums ?
                            <Button className='w-50' onClick={assignSquares} disabled={squares?.length !== 100}>Assign Numbers To Board</Button>
                            :
                            <Button className='w-50' onClick={handleResetBoard} disabled={!board || !board?.colnums} >ResetBoard</Button>
                        }
                    </Row>
                    <Row className='justify-content-center'>
                            <Button className='w-50' onClick={handleClearBoard} disabled={!squares?.length}>Clear Board</Button>
                        

                           <Button className='w-50' onClick={handleFillBoard} disabled={squares?.length === 100}>Fill Board</Button>
                    </Row>

                    <Row>
                        <GameUI board={board} />
                    </Row>

                </Col>
                <Col className='overflow-auto mt-3 me-3' style={{width: "900px", height: "720px"}}>
                    {squares && board ? <BoardUI board = {board} /> : <p>Board Goes here</p>}
                </Col>
            </Row>
        </>
    )
}

export default LetsPlay

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