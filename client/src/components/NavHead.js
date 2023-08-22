import React, {useContext} from 'react'
import {UserContext} from '../context/user'
import { Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'

function NavHead({ handleLogout }) {
    const { user} = useContext(UserContext)
    // console.log(user)
    return (
        <div>
            <span>Welcome, {user && user.username}</span>
            <Button className='btn-info' onClick={handleLogout}>LogOut</Button>
            <Link to= "/home">To Home</Link>
        </div>
    )
}

export default NavHead