import React, { useEffect, useContext } from 'react'
import { useHistory, Link } from 'react-router-dom'
import {UserContext} from '../context/user'
function Home() {
    const {user, setUser} = useContext(UserContext)
    // console.log(user)


    return (
        <div className='App'>
            This is the Homepage
            <Link to={`/profile/${user.id}`}>Profile Page :: </Link>
            <Link to="/boardmanager">Board Page :: </Link>
            <Link to='/leaderboard'>LeaderBoard Page :: </Link>
            <Link to='/boardviewer'>Let's Play Page :: </Link>
        </div>

    )
}

export default Home