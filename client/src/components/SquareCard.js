import React from 'react'

function SquareCard({squareInfo}) {
  return (
    <div>
    {squareInfo?.user?.username} :
    {squareInfo.board_pos}
  </div>
  )
}

export default SquareCard
