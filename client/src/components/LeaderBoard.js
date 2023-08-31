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
      <ListGroup.Item className="d-flex justify-content-evenly align-items-center border-dark border-2 border-top-0 border-start-0 border-end-0" style={{ height: "75px"}}>
        <div className='w-50 p-1 rounded-pill w-50 fs-3 fw-bold'>
          {user.username}
        </div>
        <div className='p-2 fs-5 fw-bolder'>
          {user.games_won}
        </div>



      </ListGroup.Item>)
  })
  const keyedLeaders = React.Children.toArray(leaders)

  return (
    <div className=''>
      {keyedLeaders && <DisplayComponent keyedLeaders={keyedLeaders} />}
      {/* <footer style={{height:"20px"}}></footer> */}
    </div>
  )
}

export default LeaderBoard

function DisplayComponent({ keyedLeaders }) {
  return (
    <Container className="mt-5" style={{ width: "50%"}}>
      <h1 className='text-center text-danger'>LeaderBoard</h1>
      <ListGroup as="ol" numbered className='text-center m-2 fs-3 border border-dark border-2 border-bottom-0' variant='flush'>
        <Row className="d-flex justify-content-evenly align-items-start ms-0 me-0 bg-danger">
          <Col className='fs-5 mt-1 pb-2 border-bottom fw-bold border-dark border-2'>
            Rank
          </Col>
          <Col className='fs-5 mt-1 pb-2 border-bottom fw-bold border-dark border-2' xs={5}>
            Users
          </Col>
          <Col className='fs-5 mt-1 pb-2 border-bottom fw-bold border-dark border-2'>
            Games Won
          </Col>
        </Row>
        {keyedLeaders}
      </ListGroup>
    </Container>
  )
}