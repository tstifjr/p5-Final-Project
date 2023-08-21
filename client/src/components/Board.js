import React, { useState, useContext, useEffect } from 'react'
import Square from './Square'
import { UserContext } from '../context/user'
function Board() {
  const { user } = useContext(UserContext)
  const [allSquares, setAllSquares] = useState(null)
  const [randomRows, setRandomRows] = useState([])
  const [randomCols, setRandomCols] = useState([])

  useEffect(() => {
    fetch('/squares').then(r => {
      if (r.ok) {
        r.json()
          .then(data => setAllSquares(data))
      }
    })
  }, [setAllSquares])
  // initializeBoard(allSquares)

  const handleAddSq = (id) => {
    const squareObj = {
      "board_pos": id,
      "user_id": user.id
      // 'row_num': null,
      // 'col_num': null
    }
    // console.log(squareObj)
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

  function editAllSquares() {
    const copy = [...allSquares]
    const edited_copy = copy.map(square => {
      const row_pos = Math.ceil(square.board_pos / 10)
      const col_pos = square.board_pos % 10 || 10
      square.row_num = randomRows[row_pos - 1]
      square.col_num = randomCols[col_pos - 1]
      return square
    })
    // console.log(edited_copy)
  }

  function initializeBoard() {
    const board_layout = []
    for (let i = 1; i < 101; i++) {
      const isFound = allSquares.find(e => (e.board_pos === i))
      if (isFound) {
        // console.log(isFound)
        board_layout.push(<Square id={i} row={Math.ceil(i / 10)} col={i % 10 || 10} squareInfo={isFound} handleRemoveSq={handleRemoveSq} />)
      }
      else {
        board_layout.push(<Square id={i} row={Math.ceil(i / 10)} col={i % 10 || 10} handleAddSq={handleAddSq} />)
      }
    }
    const keyed_board = React.Children.toArray(board_layout)
    return keyed_board
  }

  function generateColNums() {
    const row = []
    for (let i = 1; i < 11; i++) {
      row.push(<NumTile row={1} col={i % 10 || 10} number={randomCols[i - 1]} />)
    }
    const keyed_row = React.Children.toArray(row)
    return keyed_row
  }

  function generateRowNums() {
    const cols = []
    for (let i = 1; i < 11; i++) {
      cols.push(<NumTile row={i % 10 || 10} col={1} number={randomRows[i - 1]} />)
    }
    const keyed_cols = React.Children.toArray(cols)
    return keyed_cols
  }

  function randomize() {
    setRandomRows(genRandNums())
    setRandomCols(genRandNums())
  }

  function lockSquares() {
    if (randomRows.length && randomCols.length) {
      editAllSquares()
      console.log(allSquares)
    }
    else {
      console.log(allSquares)
    }

  }

  return (
    <>
      <div>
        <h2>{user && user.username} pick your squares</h2>
        <p>Here is where we will provide user info and interaction</p>
      </div>
      <div className='App'>Board</div>
      <button onClick={randomize}>Randomize</button>
      <button onClick={lockSquares}>LockBoard</button>
      <div style={{ "display": "flex" }}>
        <div className='row-nums'>
          {randomRows.length ? generateRowNums() : <></>}
        </div>
        <div className='col-nums'>
          {randomCols.length ? generateColNums() : <></>}
        </div>
        <div className='Wrapper'>
          {allSquares && initializeBoard()}
        </div>
      </div>

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