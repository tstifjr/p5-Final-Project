import React, { useState, useContext, useEffect } from 'react'
import Square from './Square'
import { BoardContext } from '../context/board';
import { UserContext } from '../context/user'
import {Button, Container, Table } from 'react-bootstrap/'
function Board() {
  const { user } = useContext(UserContext)
  const { board, setBoard } = useContext(BoardContext)
  const [allSquares, setAllSquares] = useState(null)
  const [randomRows, setRandomRows] = useState([])
  const [randomCols, setRandomCols] = useState([])
  const [isLocked, setIsLocked] = useState(false)


  const buildTable = board && Array.from({ length: 10 }).map((x, j) => {
    const displayRow = board && board.filter((_, i) => i < (j + 1) * 10 && i >= j * 10).map((square, i) => <td key={i}> <Square key={i} squareInfo={square}/> </td>)
    return (
      <tr>
        <td>random Col # goes here</td>
        {displayRow}
      </tr>
    )
  })
  const keyedBoard = React.Children.toArray(buildTable)





  useEffect(() => {
    fetch('/squares').then(r => {
      if (r.ok) {
        r.json()
          .then(data => setAllSquares(data))
      }
    })
  }, [setAllSquares])

  const handleAddSq = (id) => {
    const squareObj = {
      "board_pos": id,
      "user_id": user.id
    }
    fetch('/squares', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(squareObj, null, 2),
    }).then(r => {
      if (r.ok) {
        r.json().then(newSquare => setAllSquares([...allSquares, newSquare]))
      }
      else {
        r.json().then(data => console.log(data))
      }
    })

  }

  const handleRemoveSq = (squareInfo) => {
    if (squareInfo.user_id !== user.id) {
      console.log("u don't own this square")
    }

    else {
      fetch(`/squares/${squareInfo.id}`, {
        method: "DELETE",
      })
        .then(r => {
          if (r.status === 204) {
            console.log('delete sucessful')
            const now_deleted = allSquares.filter(square => square.id !== squareInfo.id)
            setAllSquares(now_deleted)
          }
        })
    }
  }

  function editAllSquares(randomRowArr, randomColArr) {
    const copy = [...allSquares]
    const edited_copy = copy.map(square => {
      const set_row_num = randomRowArr[Math.ceil(square.board_pos / 10) - 1]
      const set_col_num = randomColArr[(square.board_pos % 10 || 10) - 1]

      const updateSquare = { "row_num": set_row_num, "col_num": set_col_num }
      fetch(`/squares/${square.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateSquare),
      }).then(r => {
        if (r.ok) {
          r.json().then(data => {
            square.row_num = data.row_num
            square.col_num = data.col_num
          })
        }
      })
      return square
    })
    setAllSquares(edited_copy)
  }



  function randomize() {
    const randomRowArr = genRandNums()
    const randomColArr = genRandNums()
    setRandomRows(randomRowArr)
    setRandomCols(randomColArr)
    editAllSquares(randomRowArr, randomColArr)


  }

  const handleResetBoard = () => {
    setRandomCols([])
    setRandomRows([])
    const copy = [...allSquares]
    const edited_copy = copy.map(square => {
      const set_row_num = null
      const set_col_num = null
      const updateSquare = { "row_num": set_row_num, "col_num": set_col_num }

      fetch(`/squares/${square.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateSquare),
      }).then(r => {
        if (r.ok) {
          r.json().then(data => {
            square.row_num = data.row_num
            square.col_num = data.col_num
          })

        }
        else {
          r.json().then(data => console.log(data))
        }
      })
      return square
    })
    setAllSquares(edited_copy)
  }

  // function initializeBoard() {
  //   const board_layout = []
  //   for (let i = 1; i < 101; i++) {
  //     const isFound = allSquares.find(e => (e.board_pos === i))
  //     if (isFound) {
  //       board_layout.push(<Square id={i} row={Math.ceil(i / 10)} col={i % 10 || 10} squareInfo={isFound} handleRemoveSq={handleRemoveSq} isLocked={isLocked} />)
  //     }
  //     else {
  //       board_layout.push(<Square id={i} row={Math.ceil(i / 10)} col={i % 10 || 10} handleAddSq={handleAddSq} isLocked={isLocked} />)
  //     }
  //   }
  //   const keyed_board = React.Children.toArray(board_layout)
  //   return keyed_board
  // }

  // function generateColNums() {
  //   const row = []
  //   for (let i = 1; i < 11; i++) {
  //     row.push(<NumTile row={1} col={i % 10 || 10} number={randomCols[i - 1]} />)
  //   }
  //   const keyed_row = React.Children.toArray(row)
  //   return keyed_row
  // }

  // function generateRowNums() {
  //   const cols = []
  //   for (let i = 1; i < 11; i++) {
  //     cols.push(<NumTile row={i % 10 || 10} col={1} number={randomRows[i - 1]} />)
  //   }
  //   const keyed_cols = React.Children.toArray(cols)
  //   return keyed_cols
  // }

  return (
    <>
      <div>
        <h2>{user && user.username} pick your squares</h2>
        <p>Here is where we will provide user info and interaction</p>
      </div>
      <div className='App'>Board</div>
      <Button onClick={randomize} disabled={!isLocked}>Randomize</Button>
      <Button onClick={() => setIsLocked(!isLocked)}>{isLocked ? 'Unlock' : 'LockBoard'}</Button>
      <Button onClick={handleResetBoard}>Reset Board</Button>
      <Container>
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th># W \ L</th>
              {board && Array.from({ length: 10 }).map((_, index) => (
                <th key={index}>Random # here</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {keyedBoard}
          </tbody>
        </Table>
      </Container >

      {/* <div style={{ "display": "flex" }}>
        <div className='row-nums'>
          {randomRows.length ? generateRowNums() : <></>}
        </div>
        <div className='col-nums'>
          {randomCols.length ? generateColNums() : <></>}
        </div>
        <div className='Wrapper'>
          {allSquares && initializeBoard()}
        </div>
      </div> */}

    </>

  )
}

export default Board

function NumTile({ row, col, number }) {
  const styled = {
    'gridColumn': col,
    'gridRow': row,
  }

  return (
    <div className="square" style={styled}><h3>{number}</h3></div>
  )
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