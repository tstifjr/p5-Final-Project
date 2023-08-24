import React, { useContext } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { UserContext } from '../context/user'
import { SquaresContext } from '../context/squares'

function SquareCard({ squareInfo }) {
  const { user } = useContext(UserContext)
  const { squares, setSquares } = useContext(SquaresContext)

  const highlight = squareInfo.user_id === user.id ? 'border border-secondary' : "border"
  const handleRemoveSq = () => {
    // if (squareInfo.user_id !== user.id) {
    //   console.log("u don't own this square")
    // }

      fetch(`/squares/${squareInfo.id}`, {
        method: "DELETE",
      })
        .then(r => {
          if (r.status === 204) {
            console.log('delete sucessful')
            const now_deleted = squares.filter(square => square.id !== squareInfo.id)
            setSquares(now_deleted)
          }
        })
  
  }

  return (
    <Card className={highlight}>
      <Card.Body className='text-center mt-1'>
        {squareInfo?.user?.username}
        {squareInfo.user_id === user.id && <Button  onClick={handleRemoveSq}>Remove</Button>}
      </Card.Body>
    </Card>
  )
}

export default SquareCard
