import React, { useState, useContext, useEffect } from 'react'
import Square from './Square'
import { SquaresContext } from '../context/squares';
import { UserContext } from '../context/user'
import { Button, Container, Table } from 'react-bootstrap/'
import { initializeBoard } from '../context/globalFunctions';
import BuildBoard from './BuildBoard';

function EditBoard() {
  const { user } = useContext(UserContext)
  const { squares, setSquares } = useContext(SquaresContext)
  const [randomRows, setRandomRows] = useState([])
  const [randomCols, setRandomCols] = useState([])
  const [isLocked, setIsLocked] = useState(false)

  return (
    <>
      <Container>
        <p>You can edit your selections below</p>
      </Container>

      <Container>
        <h2 className='text-center'>The Board</h2>
        {squares && <BuildBoard squares={squares} squareType={"Square"}/>}
      </Container >
    </>

  )
}

export default EditBoard

// function BuildBoardEditor({ squares }) {
//   const board = initializeBoard(squares)
//   const buildTable = board && Array.from({ length: 10 }).map((x, j) => {
//     const displayRow = board && board.filter((tile, i) => i < (j + 1) * 10 && i >= j * 10).map((square, i) => <td key={i}><Square key={i} pos={j * 10 + (i + 1)} squareInfo={square} /> </td>)
//     return (
//       <tr>
//         {displayRow}
//       </tr>
//     )
//   })
//   const keyedBoard = React.Children.toArray(buildTable)
//   return (
//     <Table bordered hover responsive>
//       <tbody>
//         {keyedBoard}
//       </tbody>
//     </Table>
//   )
// }

// function NumTile({ row, col, number }) {
//   const styled = {
//     'gridColumn': col,
//     'gridRow': row,
//   }

//   return (
//     <div className="square" style={styled}><h3>{number}</h3></div>
//   )
// }

// function genRandNums() {
//   const hashmap = new Map();
//   let i = 0;
//   while (hashmap.size < 10) {
//     let r = Math.floor(Math.random() * 10)
//     hashmap.set(r, i)
//     i++
//   }
//   return Array.from(hashmap.keys())
// }