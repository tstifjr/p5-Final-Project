import React, { useState, useContext } from 'react'
import Col from 'react-bootstrap/Col'
import { Row, Button, Container, Table } from 'react-bootstrap'
import SquareView from './SquareView'
import { SquaresContext } from '../context/squares';

function LetsPlay() {
    const { squares, setSquares } = useContext(SquaresContext)
    const [randNums, setRandNums] = useState(null)
    const [show, setShow] = useState(false)


    console.log(squares)
    const handleFillBoard = () => {
        //Send SPECIAL POST REQUEST TO FILL OUT BOARD
        const data = {"empty_squares" : initializeBoard(squares)[1]}
        fetch('/fillboard', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data, null, 2),
          }).then(r => {
            if (r.ok) {
              r.json().then(filledSquares => setSquares([...squares,...filledSquares]))
            }
            else {
              r.json().then(res => console.log(res))
            }
          })
    }

    const handleResetBoard = () => {
        setRandNums(null)
        //Send Delete All request
        fetch('/squares', {
            method: "DELETE"
        })
        .then (r => {
            if (r.status === 204){
                setSquares([])
                initializeBoard([])
            }
        })
    }

    return (
        <>
            <Row>
                <Col xs={3} className='ms-1'>
                    <Row>
                        <div>Menu Buttons Go Here</div>
                        <div><Button onClick={handleFillBoard}>Fill Board</Button>
                            <Button onClick={() => setRandNums([genRandNums(), genRandNums()])}>Gen Nums</Button>
                            <Button onClick={() => setShow(!show)}>DisplayGameBoard</Button></div>
                        <div><Button onClick={handleResetBoard}>ResetBoard</Button></div>
                        <div><Button>PlayGame</Button></div>
                    </Row>
                    <Row>
                        <h3>Some Other Stuff Goes here</h3>
                    </Row>

                </Col>
                <Col xs={8}>
                    {show && squares ? <BuildPlayBoard squares={squares} randNums={randNums} /> : <p>Board Goes here</p>}
                </Col>
            </Row>
            <Row>
                <Col className='text-center'>

                </Col>
            </Row>
        </>
    )
}

export default LetsPlay


function BuildPlayBoard({ squares, randNums}) {
    const rowNums = randNums && randNums[0]
    const colNums = randNums && randNums[1]
    const board = initializeBoard(squares)[0]
    const buildTable = board && Array.from({ length: 10 }).map((x, j) => {
        const filterRow = board && board.filter((_, i) => i <= j * 10 + 9 && i >= (j) * 10 )
        const displayRow = filterRow.map((square, i) => <td key={i}><SquareView key={square.id} square={square} /> </td>)
        return (
            <tr>
                {randNums && <th>{rowNums[j]}</th>}
                {displayRow}
            </tr>
        )
    })
    const keyedBoard = React.Children.toArray(buildTable)
    return (
        <Table bordered hover responsive>
            <thead>
                {randNums && <tr>
                    <th># W \ L</th>
                    {board && Array.from({ length: 10 }).map((_, i) => (
                        <th key={i}>{colNums[i]}</th>
                    ))}
                </tr>}
            </thead>
            <tbody>
                {keyedBoard}
            </tbody>
        </Table>
    )

}


function initializeBoard(squaresArr) {
    const board_layout = []
    const emptyTile = {}
    const emptySquares = []
    for (let i = 0; i < 100; i++) {
        const isFound = squaresArr?.find(e => (e.board_pos === i))
        if (isFound) {
            board_layout.push(isFound)
        }
        else {
            board_layout.push(emptyTile)
            emptySquares.push(i)
        }
    }
    return [board_layout, emptySquares]
}

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

export { initializeBoard, genRandNums }