import React, { useState, useContext } from 'react'
import SquareCard from './SquareCard'
import { UserContext } from '../context/user'
import { SquaresContext } from '../context/squares'
import { Button, Container, Card } from 'react-bootstrap'
function Square({ pos, squareInfo }) {
  const { user } = useContext(UserContext)
  const { squares, setSquares } = useContext(SquaresContext)

  const handleAddSq = () => {
    const squareObj = {
      "board_pos": pos,
      "user_id": user.id
    }
    fetch('/squares', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(squareObj, null, 2),
    }).then(r => {
      if (r.ok) {
        r.json().then(newSquare => setSquares([...squares, newSquare]))
      }
      else {
        r.json().then(data => console.log(data))
      }
    })

  }

  return (
    <div>
      {squareInfo.user ?
        <SquareCard key={squareInfo.id} squareInfo={squareInfo} />
        :
        <Card>
          <Card.Body className='text-center mt-1'>
            <Button onClick={handleAddSq}>Add Square</Button>
          </Card.Body>
        </Card>
      }
    </div>
  )
}

export default Square
