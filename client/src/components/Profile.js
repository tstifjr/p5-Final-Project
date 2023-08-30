import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/user'
import { useParams } from 'react-router-dom'
import { Card, Container, Col, Row } from 'react-bootstrap'

function Profile() {
  const { userId } = useParams();
  const { user, setUser } = useContext(UserContext)
  const [viewedUser, setViewedUser] = useState(null)
  useEffect(() => {

    fetch(`/users/${userId}`)
      .then(r => {
        if (r.ok) {
          r.json()
            .then(user => setViewedUser(user))
        }
      })


  }, [setViewedUser, userId])

  const squareCardList = viewedUser && viewedUser.squares.map((square, idx) => {
    return (
      <Col key={idx}>
        <SquareCardProfile square={square} />
      </Col>)
  })

  return (
    <Container className='text-center'>
      <Container fluid className='p-1'>
        <Row className='mt-2 border font-monospace p-3 rounded-top bg-warning' ><h2>User : {viewedUser && viewedUser.username}</h2> </Row>
        <Row className='row-col-2 p-1 mb-3 bg-dark border rounded-bottom text-warning'>
          <Col className='p-3 mb-3 fs-3'> Squares Owned: {squareCardList?.length}</Col>
          {viewedUser?.games_won ?
          <Col className='p-3 mb-3 fs-3'>Games Won: {viewedUser.games_won}</Col>
          : <></>}
        </Row>
      </Container>


      <Row xs={1} md={5} className="g-4">
        {squareCardList}
      </Row>

    </Container>
  )
}

export default Profile

function SquareCardProfile({ square }) {
  const renderNums = (square.col_num === null) ? null : `(${square.col_num}, ${square.row_num})`
  const lastGame = square?.games.length > 0 && square?.games[square?.games.length - 1]
  return (
    <>
      {square && <Card className="mx-auto text-center align-items-center border-dark border-3 rounded-circle" style={{ height: '9rem', width: '9rem' }} >
        <Card.Title className='mt-2'>
          {square.board_pos}
        </Card.Title>
        <Card.Header className='border border-2 border-danger'>
          {<span style={{ fontFamily: "cursive" }}>{renderNums}</span>}
        </Card.Header>

        <Card.Body>
          {square.games.map((g) => <span key={g.id} className='p-1'>🏀</span>)}
          {/* {lastGame && <span>Last Score: {lastGame.win_team} : {lastGame.win_score} : {lastGame.lose_team} : {lastGame.lose_score}</span>} */}
        </Card.Body>
      </Card>
      }
    </>
  )
}