import React, { useEffect, useContext } from 'react'
import LoginSignup from './LoginSignup'
import { useHistory } from 'react-router-dom'
import {UserContext} from '../context/user'
function Home() {
    const {user, setUser} = useContext(UserContext)
    console.log(user)


    return (
        <div className='App'>

            This is the Homepage
            <LoginSignup />
        </div>

    )
}

export default Home