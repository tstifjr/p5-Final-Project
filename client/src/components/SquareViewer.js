import React, {useContext, useState} from 'react'
import { useHistory} from 'react-router-dom'
import { Row, Col, Container, Card } from 'react-bootstrap'
import { UserContext } from '../context/user'
import '../index.css'


function SquareViewer({ square, id }) {
    const {user} = useContext(UserContext)
    // const [highlight, setHighlight] = useState('')
    const history = useHistory()
    const handleView = () => {
        // console.log(square.user.id)
        history.push(`/profile/${square.user.id}`)
    }

    const highlight = 'border border-3 border-primary square-style'
    const noHighlight = 'border border-3 square-style'

    return (
        <>
            {square.user ?
                <div className={user && user.id === square?.user.id ? highlight : noHighlight} onClick={handleView}>
                    <div className='mt-4 text-center d-flex flex-column'>
                        <Col className="">{square?.user?.username}</Col>
                <Col>{square.games.map((g) => <span key={g.id}>{"🏀"}</span>)}</Col>
                        
                    </div>
                </div>
                :
                <div className="d-flex border text-center p-3 align-items-center border border-3 square-style">
                </div>
            }

        </>
    )
}

export default SquareViewer