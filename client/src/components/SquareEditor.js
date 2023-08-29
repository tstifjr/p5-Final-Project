import React, { useState, useContext } from 'react'
// import SquareCard from './SquareCard'
import { UserContext } from '../context/user'
import { SquaresContext } from '../context/squares'
import { Button, Container, Card } from 'react-bootstrap'

function SquareEditor({ pos, square }) {
  const { user } = useContext(UserContext)
  const { squares, setSquares } = useContext(SquaresContext)


  const handleRemoveSq = () => {

    fetch(`/squares/${square.id}`, {
      method: "DELETE",
    })
      .then(r => {
        if (r.status === 204) {
          console.log('delete sucessful')
          const now_deleted = squares.filter(s => s.id !== square.id)
          setSquares(now_deleted)
        }
      })
  }

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
      {square.user ?
          <SquareCard square={square} handleRemoveSq={handleRemoveSq}/>
        :
        <div className="d-flex border text-center p-3 align-items-center" style={{ width: "150px", height: "150px" }}>
          <div>
          <Button onClick={handleAddSq}>Add Square</Button>
          </div>
        </div>
      }
    </div>
  )
}

export default SquareEditor

function SquareCard({ square, handleRemoveSq }) {
  const { user } = useContext(UserContext)

  return (
    <div className="border text-center p-3 align-items-center" style={{ width: "150px", height: '150px' }}>
      <div className='mt-5 text-center'>
        {square?.user?.username}
        <div className='p-1'>
          {square.user_id === user.id && <Button onClick={handleRemoveSq}>Remove</Button>}
        </div>
      </div>
    </div>
  )
}