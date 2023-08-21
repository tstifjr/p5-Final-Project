import React, { useState, useContext } from 'react'
import { UserContext } from '../context/user'

function Square({ id, row, col, squareInfo, handleAddSq, handleRemoveSq }) {
  // const myClass = `square ${row}${col}`
  const [owned, setOwned] = useState(false)
  const { user } = useContext(UserContext)
  const styled = {
    'gridColumn': col,
    'gridRow': row,
  }

  return (
    <div className="square" style={styled}>
      {squareInfo ? 
      <div onClick={() => handleRemoveSq(squareInfo)}>Owned by: {squareInfo.user_id}
      </div>
        :
        <button className='button' onClick={() => handleAddSq(id)}>Add Square</button>}
    </div>
  )
}

export default Square