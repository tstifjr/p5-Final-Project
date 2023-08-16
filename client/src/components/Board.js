import React, {useState, useContext} from 'react'
import Square from './Square'
import { UserContext } from '../context/user'
function Board() {
 const {user} = useContext(UserContext)
 const [state, setState] = useState('')

  return (
    <>
      <div>Board</div>
      <div className='Wrapper'>
        <div className='a1' onClick={(e)=>setState(e.target.innerText)}><Square /></div><div className='a2'><Square /></div><div className='a3'><Square /></div><div className='a4'><Square /></div><div className='a5'><Square /></div>
        <div className='b1'><Square /></div><div className='b2'><Square /></div><div className='b3'><Square /></div><div className='b4'><Square /></div><div className='b5'><Square /></div>
        <div className='c1'><Square /></div><div className='c2'><Square /></div><div className='c3'><Square /></div><div className='c4'><Square /></div><div className='c5'><Square /></div>
        <div className='d1'><Square /></div><div className='d2'><Square /></div><div className='d3'><Square /></div><div className='d4'><Square /></div><div className='d5'><Square /></div>
        <div className='e1'><Square /></div><div className='e2'><Square /></div><div className='e3'><Square /></div><div className='e4'><Square /></div><div className='e5'><Square /></div>
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