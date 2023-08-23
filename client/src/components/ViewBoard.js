import React, { useState, useContext, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import Tile from './Tile'
import { BoardContext } from '../context/board';
import { initializeBoard, genRandNums } from '../context/globalFunctions';

function ViewBoard() {
    const [allSquares, setAllSquares] = useState(null)
    const {board, setBoard } = useContext(BoardContext)
    const [randNums, setRandNums] = useState([])
    console.log(randNums)
    useEffect(() => {
        fetch('/squares').then(r => {
            if (r.ok) {
                r.json()
                    .then(data => {
                        setAllSquares(data)
                        setBoard(initializeBoard(data))
                    })
            }
        })
    }, [setAllSquares])

    const buildTable = board && Array.from({ length: 10 }).map((x, j) => {
        const displayRow = board && board.filter((tile, i) => i < (j + 1) * 10 && i >= j * 10).map((square, i) => <td key={i}><Tile key={i} squareObj={square} /> </td>)
        return (
            <tr>
                <td>{j}</td>
                {displayRow}
            </tr>
        )
    })
    const keyedBoard = React.Children.toArray(buildTable)

    return (
        <>
            <Container>
                <header>ViewBoard</header>
                <button onClick={()=>setRandNums(genRandNums)}>click Me</button>
            </Container>
            <Container>
                <Table bordered hover responsive>
                    <thead>
                        <tr>
                            <th># W \ L</th>
                            {board && Array.from({ length: 10 }).map((_, index) => (
                                <th key={index}>{index}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {keyedBoard}
                    </tbody>
                </Table>
            </Container >



        </>

    )
}

export default ViewBoard