import React, { useEffect, useState, useContext } from 'react'
import { Container, Button, Col, Row } from 'react-bootstrap'

function GameUI({ games, cnt }) {

  const completedGames = games && games.filter((game) => game.id <= cnt)
  return (
    <Container>

      <Col className='overflow-auto border border-5' style={{maxHeight: "620px", minHeight: "620px"}}>
        {games && completedGames.map(game => {
          return (<div key={game.id}>
            <span>Round: {game.round} ::</span>
            <span>Teams: {game.win_team}, {game.lose_team} ::</span>
            <span>Score: {game.win_score}, {game.lose_score} ::</span>
            <span>Winner: {game.square?.board_pos}</span>
          </div>)
        })
        }
      </Col>
    </Container>
  )
}

export default GameUI
