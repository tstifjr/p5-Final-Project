import React, { useState, useContext } from 'react'
import Square from './Square'
import { UserContext } from '../context/user'
function Board() {
  const { user } = useContext(UserContext)
  const [state, setState] = useState('')


  return (
    <>
      <div className='App'>Board</div>
      <div style={{"display" : "flexColumn"}}>
        <div className='Wrapper'>
          {buildRow("1")}
          {buildRow("2")}
          {buildRow("3")}
          {buildRow("4")}
          {buildRow("5")}
          {buildRow("6")}
          {buildRow("7")}
          {buildRow("8")}
          {buildRow("9")}
          {buildRow("10")}
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



// Build function to create rows for board
function buildRow(char) {
  const row = []
  for (let i = 1; i <= 10; i++) {
    row.push(<Square row={char} col={i} />)
  }
  const keyed_row = React.Children.toArray(row)
  return keyed_row
}