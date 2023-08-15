import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

function LoginSignup() {
    const history = useHistory()
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
            <div>LoginSignup</div>
            <button name="login" onClick={(e) => handleClick(e)}>Login</button>
            <button name="signup" onClick={(e) => handleClick(e)}>Signup</button>
        </>

    )
}

export default LoginSignup