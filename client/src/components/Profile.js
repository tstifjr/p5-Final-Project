import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/user'
import { useParams } from 'react-router-dom'
import { Card, Container, Col, Row } from 'react-bootstrap'

function Profile() {
  const { userId } = useParams();
  const { user, setUser } = useContext(UserContext)
  // const id = user && user.id
  // const history = useHistory()
  useEffect(() => {

    fetch(`/users/${userId}`)
      .then(r => {
        if (r.ok) {
          r.json()
            .then(data => setUser(data))
        }
      })


  }, [setUser, userId])

  const squareCardList = user && user.squares.map((square, idx) => {
    return (
      <Col key={idx}>
        <SquareCard square={square} />
      </Col>)
  })
  // const keyedSquares = React.Children.toArray(squareCardList)

  // const gamesList = user && user.games.map(game => <div><span>{game.win_team} : {game.win_score}</span> <span>{game.lose_team} : {game.lose_score}</span></div>)
  // const keyedGamesList = React.Children.toArray(gamesList)
  return (
    <div className='App'>
      {/* <h2>Welcome, {user && user.username}</h2> */}
      {user && user.games_won > 0 ?
        <div>
          <h4>You have won: {user.games_won} games</h4>
        </div> : <></>}
      <h3 className='p-3'> Your Squares are:</h3>
      <Row xs={1} md={5} className="g-4">
        {squareCardList}
      </Row>

    </div>
  )
}

export default Profile

function SquareCard({ square }) {
  const sqNum = `Pos: ${square.board_pos} `
  const renderNums = (square.col_num === null) ? null : `(${square.col_num}, ${square.row_num})`
  const lastGame = square?.games.length > 0 && square?.games[square?.games.length - 1]
  console.log(square)
  return (
    <Card className="mx-auto" style={{ width: '12rem' }} >
      <Card.Title>
        {sqNum}
      </Card.Title>
      <Card.Header>
        {square && <span>{renderNums}</span>}
      </Card.Header>

      <Card.Body>
        {lastGame && <span>Last Score: {lastGame.win_team} : {lastGame.win_score} : {lastGame.lose_team} : {lastGame.lose_score}</span>}
      </Card.Body>
    </Card>

  )
}