import React, { useEffect, useContext } from 'react'
import { useHistory, Link } from 'react-router-dom'
import {UserContext} from '../context/user'
import ViewBoard from './ViewBoard'
function Home() {
    const {user, setUser} = useContext(UserContext)
    // console.log(user)

    return (
        user ? <div className='App'>
            This is the Homepage
            <Link to='/boardviewer'>Let's Play Page :: </Link>
            <div>
                <ViewBoard />
            </div>
        </div> 
        : 
        <div></div>

    )
}

export default Home