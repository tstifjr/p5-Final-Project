import React, { useState, useContext, useEffect } from 'react'
import Col from 'react-bootstrap/Col'
import { Row, Button, Container, Table, ButtonGroup, Card } from 'react-bootstrap'
import { SquaresContext } from '../context/squares';
import GameUI from './GameUI';
import { patchItem, initializeBoard } from '../globalFunctions'
import BoardUI from './BoardUI';
import '../index.css';

function LetsPlay() {
    const { squares, setSquares } = useContext(SquaresContext)
    const [board, setBoard] = useState(null)
    const [games, setGames] = useState([])
    const [cnt, setCnt] = useState(0)

    useEffect(() => {
        fetch('/games')
            .then(r => r.json())
            .then(g => setGames(g))

        fetch('/boards/1')
            .then(r => r.json())
            .then(b => {
                setBoard(b)
                setCnt(b['game_cnt'])
            })

    }, [setGames])

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

        //clear board nums 
        const boardData = { "rownums": null, "colnums": null, "game_cnt": 0 }
        patchItem(board, boardData, `/boards/${board.id}`)
        setBoard({ ...board, rownums: null, colnums: null})
        
        //scrub both
        fetch('/scrubboard',{
           method : "DELETE" 
        }).then(r => {
            if (r.ok) {
                r.json().then (data =>{
                    setCnt(0)
                    setSquares(data[0])
                    setGames(data[1])
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

    const handleGameCreate = () => {

        const rowNums = board?.rownums.split(',').map(num => parseInt(num))
        const colNums = board?.colnums.split(',').map(num => parseInt(num))
        const game = games[cnt]
        const rowIdx = rowNums && rowNums.indexOf(game.lose_score % 10)
        const colIdx = colNums && colNums.indexOf(game.win_score % 10)
        const board_pos = rowIdx * 10 + colIdx
        const square = squares.find(square => square.board_pos === board_pos)
        if (!square) console.log("no PERSON here")
        else {
            const updateGame = { "square_id": square.id }

            //Add game to square
            patchItem(game, updateGame, `/games/${game.id}`)
            const updatedGames = [...games].map(g => g.id === game.id ? game : g)
            setGames(updatedGames)
        }

        //reFRESHES board BY FETCH ING sQUARES
        fetch('/squares').then(r => r.json()).then(squares => setSquares(squares))

        //increase game counter
        if (cnt >= games.length) {
            patchItem(board, { "game_cnt": 0 }, `/boards/1`)
            setCnt(0)
        }
        else {
            patchItem(board, { "game_cnt": cnt + 1 }, `/boards/1`)
            setCnt(cnt => cnt += 1)
        }
    }

    return (
        <>
            <Row>
                <Col xs={3} className='ms-1'>
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
                        <Button onClick={handleGameCreate} disabled={!board || !board?.colnums}>DrawGame</Button>
                    </Row>

                    <Row>
                        <GameUI games={games} cnt={cnt} />
                    </Row>

                </Col>
                <Col className='overflow-auto mt-3 me-3' style={{ maxWidth: "1200px", height: "720px" }}>
                    {squares && board ? <BoardUI board={board} /> : <p>Board Goes here</p>}
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