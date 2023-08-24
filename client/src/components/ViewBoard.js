import React, { useState, useContext, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import Tile from './Tile'
import { SquaresContext } from '../context/squares';
import { initializeBoard, genRandNums } from '../context/globalFunctions';

function ViewBoard() {
    const {squares, setSquares} = useContext(SquaresContext)
    const [randNums, setRandNums] = useState([])
    const randomRow = [0, 9, 6, 4, 2, 1, 7, 3, 8, 5]
    const randomCol = [2, 7, 1, 8, 6, 0, 7, 3, 5, 4]

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

    return (
        <>
            <Container className='text-center'>
                <h2>ViewBoard</h2>
            </Container>
            <Container fluid>
                {squares && BuildBoardFinal(squares, randomRow, randomCol)}
            </Container>



        </>

    )
}

export default ViewBoard



function BuildBoardFinal(squares, randomRow, randomCol) {
    const board = initializeBoard(squares)
    const buildTable = board && Array.from({ length: 10 }).map((x, j) => {
        const displayRow = board && board.filter((tile, i) => i < (j + 1) * 10 && i >= j * 10).map((square, i) => <td key={i}><Tile key={i} square={square} /> </td>)
        return (
            <tr>
                <th>{randomCol[j]}</th>
                {displayRow}
            </tr>
        )
    })
    const keyedBoard = React.Children.toArray(buildTable)
    return (
        <Table bordered hover responsive>
            <thead>
                <tr>
                    <th># W \ L</th>
                    {board && Array.from({ length: 10 }).map((_, i) => (
                        <th key={i}>{randomRow[i]}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {keyedBoard}
            </tbody>
        </Table>
    )

}