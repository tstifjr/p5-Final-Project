import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/user'
import { useParams } from 'react-router-dom'
import { Card, Container, Col, Row, Button, Dropdown, DropdownButton } from 'react-bootstrap'
import { patchItem } from '../globalFunctions'

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

  const editColor = (color) => {
    //patch and edit user to have color set
    const updateColor = { "sq_border_color": color }
    patchItem(user, updateColor, `/users/${user.id}`)
    setUser({ ...user, "sq_border_color": color })
  }

  return (
    <Container className='text-center'>

      <Container fluid className='p-1'>

        <Row className='mt-2 border font-monospace p-3 rounded-top bg-warning' >
          <Col>
            <h2>User : {viewedUser && viewedUser.username}</h2>
            {user?.id === viewedUser?.id && 
            <div className='d-flex justify-content-center' style={{}}>
            {/* <Button variant='secondary'>Edit Profile</Button> */}
            <span className='fw-bold mt-1 pe-2'>Square Border:</span> <DropdownButton size='sm' variant='secondary' title="Select Color">
              <Dropdown.Item as="button" onClick={e => editColor(e.target.name)} name='primary'>Blue</Dropdown.Item>
              <Dropdown.Item as="button" onClick={e => editColor(e.target.name)} name='danger'>Red</Dropdown.Item>
              <Dropdown.Item as="button" onClick={e => editColor(e.target.name)} name='success'>Green</Dropdown.Item>
              <Dropdown.Item as="button" onClick={e => editColor(e.target.name)} name='warning'>Gold</Dropdown.Item>
              <Dropdown.Item as="button" onClick={e => editColor(e.target.name)} name='info'>Light Blue</Dropdown.Item>
            </DropdownButton>
          </div>
          }
          </Col>
        </Row>
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