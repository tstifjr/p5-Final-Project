import React, {useContext} from 'react'
import {UserContext} from '../context/user'

function NavHead({ handleLogout }) {
    const { user} = useContext(UserContext)
    console.log(user)
    return (
        <div>
            <span>Welcome, {user && user.username}</span>
            <button onClick={handleLogout}>LogOut</button>
        </div>
    )
}

export default NavHead