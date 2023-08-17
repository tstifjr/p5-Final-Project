import React, {useContext} from 'react'
import {UserContext} from '../context/user'
function Profile() {
    const {user, setUser} = useContext(UserContext)

  return (
    <div className='App'>
        <h2>Welcome, {user && user.username}</h2>
        <ul> Your Squares are:
        <li>Square 1</li>
        <li>Sqaure 2</li>
        </ul>
        <h4>You have won: 6 games Congrats</h4>

    </div>
  )
}

export default Profile