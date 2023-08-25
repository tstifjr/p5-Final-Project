import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/user'
import { useParams } from 'react-router-dom'
import { Card, Container, Col, Row } from 'react-bootstrap'

function Profile() {
  const { userId } = useParams();
  const { user, setUser } = useContext(UserContext)
  const [viewedUser, setViewedUser] = useState(null)
  // const history = useHistory()
  useEffect(() => {

    fetch(`/users/${userId}`)
      .then(r => {
        if (r.ok) {
          r.json()
            .then(user => setViewedUser(user))
        }
      })


  }, [setViewedUser, userId])
  // console.log(viewedUser)

  const squareCardList = viewedUser && viewedUser.squares.map((square, idx) => {
    return (
      <Col key={idx}>
        <SquareCardProfile square={square} />
      </Col>)
  })

  console.log(viewedUser?.squares[1]?.games)
  return (
    <div className='App'>
      <h2>Profile : {viewedUser && viewedUser.username}</h2>
      {viewedUser?.games_won ?
        <div>
          <h3>Games Won: {viewedUser.games_won} games</h3>
        </div>
        : <></>
      }
      <h3 className='p-3'> Squares Owned:</h3>
      <Row xs={1} md={5} className="g-4">
        {squareCardList}
      </Row>

    </div>
  )
}

export default Profile

function SquareCardProfile({ square }) {
  const sqNum = `Pos: ${square.board_pos} `
  const renderNums = (square.col_num === null) ? null : `(${square.col_num}, ${square.row_num})`
  const lastGame = square?.games.length > 0 && square?.games[square?.games.length - 1]
  // console.log(square.games)
  return (
    <Card className="mx-auto" style={{ width: '10rem' }} >
      <Card.Title>
        {sqNum}
      </Card.Title>
      <Card.Header>
        {square && <span>{renderNums}</span>}
      </Card.Header>

      <Card.Body>
      {square.games.map((g) => <i key={g.id}>!@!</i>)}
        {/* {lastGame && <span>Last Score: {lastGame.win_team} : {lastGame.win_score} : {lastGame.lose_team} : {lastGame.lose_score}</span>} */}
      </Card.Body>
    </Card>

  )
}