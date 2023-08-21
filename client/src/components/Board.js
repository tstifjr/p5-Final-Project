import React, { useState, useContext, useEffect } from 'react'
import Square from './Square'
import { UserContext } from '../context/user'
function Board() {
  const { user } = useContext(UserContext)
  const [state, setState] = useState('')
  const [allSquares, setAllSquares] = useState(null)

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
    console.log(squareObj)
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

  function initializeBoard() {
    const board_layout = []
    for (let i = 1; i <= 100; i++) {
      const isFound = allSquares.find(e => (e.board_pos === i))
      if (isFound) {
        // console.log(isFound)
        board_layout.push(<Square id={i} row={Math.ceil(i / 10)} col={i % 10} squareInfo={isFound} handleRemoveSq={handleRemoveSq} />)
      }
      else {
        board_layout.push(<Square id={i} row={Math.ceil(i / 10)} col={i % 10} handleAddSq={handleAddSq} />)
      }
    }
    const keyed_board = React.Children.toArray(board_layout)
    return keyed_board
  }

  return (
    <>
      <div className='App'>Board</div>
      <div style={{ "display": "flexColumn" }}>
        <div className='Wrapper'>
          {/* {buildRow("1")}
          {buildRow("2")}
          {buildRow("3")}
          {buildRow("4")}
          {buildRow("5")}
          {buildRow("6")}
          {buildRow("7")}
          {buildRow("8")}
          {buildRow("9")}
          {buildRow("10")} */}
          {allSquares && initializeBoard()}
        </div>
      </div>
      <div>
        <h2>{user && user.username} pick your squares</h2>
        <p>Here is where we will provide user info and interaction</p>
        <h4>{state}</h4>
      </div>
    </>

  )
}

export default Board



// // Build function to create rows for board
// function buildRow(char) {
//   const row = []
//   const square_data = {}
//   for (let i = 1; i <= 10; i++) {
//     row.push(<Square row={char} col={i} />)
//   }
//   const keyed_row = React.Children.toArray(row)
//   return keyed_row
// }

