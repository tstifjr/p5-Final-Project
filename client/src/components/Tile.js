import React from 'react'
import { useHistory } from 'react-router-dom'
import { Row, Col, Container, Card } from 'react-bootstrap'
function Tile({ square, id }) {
    const history = useHistory()
    const handleView = () => {
        // console.log(square.user.id)
        history.push(`/profile/${square.user.id}`)
    }
    return (
        <>
            {square.user ?
                <Container onClick={handleView}>
                    <Row className='text-center'><h5>{square?.user?.username}</h5></Row>

                    <Row>
                    {square.games.map((g) => <i>@@</i>)}
                    </Row>
                </Container>
                :
                <Container>
                </Container>
            }
        </>
    )
}

export default Tile