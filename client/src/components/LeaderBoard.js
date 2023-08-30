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
            .then(data => {
              setLeadersList(data)

            })
        }
      })
  }, [])
  const leaders = leadersList.map(user => {
    return (
      <ListGroup.Item className="d-flex justify-content-evenly align-items-center bg-transparent" style={{ height: "75px", color: "white" }}>
        <div className='w-50 p-1 rounded-pill w-50 text-light fs-3'>
          {user.username}
        </div>
        <div className='p-2 fs-5 text-light'>
          {user.games_won}
        </div>



      </ListGroup.Item>)
  })
  const keyedLeaders = React.Children.toArray(leaders)

  return (
    <>
      {keyedLeaders && <DisplayComponent keyedLeaders={keyedLeaders} />}
    </>
  )
}

export default LeaderBoard

function DisplayComponent({ keyedLeaders }) {
  return (
    <Container className="mt-5" style={{ width: "50%" }}>
      <h1 className='text-center text-light'>LeaderBoard</h1>
      <ListGroup as="ol" numbered className='text-center m-2 text-white fs-3 border' variant='flush'>
        <Row className="d-flex justify-content-evenly align-items-start p-2">
          <Col className='fs-5 ms-1 mt-1 pb-2 border-bottom'>
            Rank
          </Col>
          <Col className='fs-5 mt-1 pb-2 border-bottom' xs={5}>
            Users
          </Col>
          <Col className='fs-5 mt-1 me-1 pb-2 border-bottom'>
            Games Won
          </Col>
        </Row>
        {keyedLeaders}
      </ListGroup>
    </Container>
  )
}