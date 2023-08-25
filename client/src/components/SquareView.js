import React from 'react'
import { useHistory } from 'react-router-dom'
import { Row, Col, Container, Card } from 'react-bootstrap'
function SquareView({ square, id }) {
    const history = useHistory()
    const handleView = () => {
        // console.log(square.user.id)
        history.push(`/profile/${square.user.id}`)
    }
    return (
        <>
            {square.user ?
                <Card onClick={handleView}>
                    <Card.Header className='text-center'><h5>{square?.user?.username}</h5></Card.Header>

                    <Card.Body>
                    {square.games.map((g) => <i key={g.id}>!@$</i>)}
                    </Card.Body>
                </Card>
                :
                <Card>
                </Card>
            }
        </>
    )
}

export default SquareView