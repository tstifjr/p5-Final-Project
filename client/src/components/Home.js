import React, { useEffect, useState } from 'react'
import LoginSignup from './LoginSignup'

function Home() {
    const [obj, setObj] = useState(null)
    useEffect(() => {
        fetch('/index')
            .then(r => {
                if (r.ok) {
                    r.json().then(data => {
                        console.log(data)
                        setObj(data)
                    })
                }
                else{
                    console.log("error")
                }
            })
    }, [])

    return (
        <div className='App'>
            This is the Homepage
            <p>{obj && obj['message']}</p>
            <LoginSignup />
        </div>

    )
}

export default Home