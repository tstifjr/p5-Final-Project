import React, {useContext} from 'react'
import {UserContext} from '../context/user'
import { Link} from 'react-router-dom'

function NavHead({ handleLogout }) {
    const { user} = useContext(UserContext)
    console.log(user)
    return (
        <div>
            <span>Welcome, {user && user.username}</span>
            <button onClick={handleLogout}>LogOut</button>
            <Link to= "/">To Home</Link>
        </div>
    )
}

export default NavHead