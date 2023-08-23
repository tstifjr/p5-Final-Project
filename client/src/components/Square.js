import React, { useState, useContext } from 'react'
import SquareCard from './SquareCard'
import { UserContext } from '../context/user'
import {Button} from 'react-bootstrap'
function Square({ id, row, col, squareInfo, handleAddSq, handleRemoveSq, isLocked }) {
  // const { user } = useContext(UserContext)
  // const styled = {
  //   'gridColumn': col,
  //   'gridRow': row,
  // }

  // return (
  //   <div className="square" style={styled}>
  //     {squareInfo ? 
  //     <div onClick={() => isLocked ? console.log(squareInfo) : handleRemoveSq(squareInfo)}>Owned by: {squareInfo?.user?.username}
  //     </div>
  //       :
  //       <button className='button' onClick={() => handleAddSq(id)} disabled={isLocked}>Add Square</button>}
  //   </div>
  // )
  return (
    <div>
      {squareInfo.user ?
      <div><SquareCard squareInfo={squareInfo} /></div>  :
      <div><Button>Add Square</Button></div>
    }
    </div>
  )
}

export default Square

