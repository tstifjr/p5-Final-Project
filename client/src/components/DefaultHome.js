import React, { useEffect, useContext} from 'react'
import { useHistory} from 'react-router-dom'
import {UserContext} from '../context/user'

function DefaultHome() {
    const history = useHistory()
    const {user} = useContext(UserContext)

    useEffect(()=>{
        if (user){
            history.push('/home')
        }
    },[])

    const handleClick = (e) => {
        if (e.target.name === 'login') {
            history.push('/login')
         }
         else if (e.target.name === 'signup'){
             history.push('/signup')
         } 
    }

    return (
        <>
            <div>Welcome to NCAA Squares.  Please Login or Signup Below</div>
            <button name="login" onClick={(e) => handleClick(e)}>Login</button>
            <button name="signup" onClick={(e) => handleClick(e)}>Signup</button>
        </>

    )
}

export default DefaultHome