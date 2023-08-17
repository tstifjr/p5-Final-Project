import React, { useState, useContext } from 'react'
import { UserContext } from '../context/user'

function Square({ row, col }) {
  // const myClass = `square ${row}${col}`
  const [owned, setOwned] = useState(false)
  const {user} = useContext(UserContext)
  const styled = {
    'gridColumn': col,
    'gridRow': row,
  }

  const setSquareHandle = () => {
    if (user) {
      setOwned(!owned)
    }
  }
  return (
    <div className="square" style={styled}>
      {owned ? <div onClick={setSquareHandle}>Owned</div> : <button className='button' onClick={() => setOwned(!owned)}>Add Square</button>}
    </div>
  )
}

export default Square