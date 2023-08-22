import React, { useState, useContext } from 'react'
import { UserContext } from '../context/user'

function Square({ id, row, col, squareInfo, handleAddSq, handleRemoveSq, isLocked }) {
  const { user } = useContext(UserContext)
  const styled = {
    'gridColumn': col,
    'gridRow': row,
  }

  return (
    <div className="square" style={styled}>
      {squareInfo ? 
      <div onClick={() => isLocked ? console.log(squareInfo) : handleRemoveSq(squareInfo)}>Owned by: {squareInfo?.user?.username}
      </div>
        :
        <button className='button' onClick={() => handleAddSq(id)} disabled={isLocked}>Add Square</button>}
    </div>
  )
}

export default Square