import React, { useEffect, useContext } from 'react'
import LoginSignup from './LoginSignup'
import { useHistory } from 'react-router-dom'
import {UserContext} from '../context/user'
function Home() {
    const {user, setUser} = useContext(UserContext)
    console.log(user)
    const history = useHistory()
    useEffect(() => {
        fetch('/checksession')
            .then(r => {
                if (r.ok) {
                    r.json().then(user => {
                        setUser(user)
                        console.log(user)
                    })
                }
                else{
                    r.json().then(message => {
                        console.log(message)
                        history.push('/login')
                    })
                }
            })
    }, [])

    const handleLogout = () => {
        fetch("/logout", {
            method: 'DELETE'
        }).then(r => {
            if (r.ok) {
                console.log('logout sucessful')
                setUser(null)
            }
        })
    }

    return (
        <div className='App'>
            <button onClick={handleLogout}>LogOut</button>
            This is the Homepage
            <LoginSignup />
        </div>

    )
}

export default Home