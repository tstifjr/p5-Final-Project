import React, { useEffect, useState } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/Container'
import { Col, Row } from 'react-bootstrap'
function LeaderBoard() {
  const [leadersList, setLeadersList] = useState([])
  useEffect(() => {
    fetch("/leaderboard")
      .then(r => {
        if (r.ok) {
          r.json()
            .then(data => setLeadersList(data))
        }
      })
  }, [])
  // const sort_leaders = [...usersInfo].sort((a, b) =>(b.squares.length - a.squares.length))
  // console.log(sort_leaders)
  const leaders = leadersList.map(user => {
    return (
      <ListGroup.Item className="d-flex justify-content-evenly align-items-center " style={{height : "75px"}}>
        <div className='w-50'>
          ::{user.username}::
        </div>
        <div>
          {user.games_won}
        </div>



      </ListGroup.Item>)
  })
  const keyed_leaders = React.Children.toArray(leaders)

  return (
    <Container style={{ width: "50%" }}>
      <h1 className='text-center'>LeaderBoard</h1>
      {/* <ListGroup className='text-center m-2'  variant='flush' numbered>
        <ListGroup.Item className="d-flex justify-content-evenly align-items-start">
          <div>sometext</div><div>more text</div>
          </ListGroup.Item>
      </ListGroup> */}
      <ListGroup as="ol" numbered className='text-center m-2' variant='flush'>
      <Row className="d-flex justify-content-evenly align-items-start p-2">
        <Col className='fs-5'>
        Rank
        </Col>
      <Col className='fs-5' xs={5}>
          Users
        </Col>
        <Col className='fs-5'>
          Games Won
        </Col>
      </Row>
        {keyed_leaders}
      </ListGroup>

    </Container>

  )
}

export default LeaderBoard