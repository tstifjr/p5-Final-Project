import React from 'react'
import Table from 'react-bootstrap/Table'
import SquareView from './SquareView'
import Square from './Square';

function BuildBoard({ squares, squareType }) {
    const board = initializeBoard(squares)
    const buildTable = board && Array.from({ length: 10 }).map((x, j) => {
        const filterRow = board && board.filter((_, i) => i <= j * 10 + 9 && i >= (j) * 10 )
        const displayRow = filterRow.map((square, i) => {
            if (squareType === "SquareView") {
                return <td><SquareView key={square.id} square={square} /> </td>
            }
            else if (squareType === "Square") {
                return <td><Square key={square.id} pos={j * 10 + (i)} squareInfo={square} /> </td>
            }

        })
        const keyedDisplayRow = React.Children.toArray(displayRow)
        return (
            <tr>
                {keyedDisplayRow}
            </tr>
        )
    })
    const keyedBoard = React.Children.toArray(buildTable)
    return (
        <Table bordered hover responsive>
            <tbody>
                {keyedBoard}
            </tbody>
        </Table>
    )
}

export default BuildBoard


function initializeBoard(squaresArr) {
    const board_layout = []
    const emptyTile = {}
    for (let i = 0; i < 100; i++) {
        const isFound = squaresArr.find(e => (e.board_pos === i))
        if (isFound) {
            board_layout.push(isFound)
        }
        else {
            board_layout.push(emptyTile)
        }
    }
    return board_layout
}