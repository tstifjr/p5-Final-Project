import React, { useEffect, useState, useContext } from 'react'
import { Container, Button, Col, Row } from 'react-bootstrap'
import { SquaresContext } from '../context/squares'

function GameUI({ randNums }) {
  const [games, setGames] = useState([])
  const [cnt, setCnt] = useState(0)
  const [showGames, setShowGames] = useState([])
  const { squares, setSquares } = useContext(SquaresContext)

  useEffect(() => {
    fetch('/games')
      .then(r => r.json())
      .then(games => setGames(games))
  }, [])


  const handleGameCreate = () => {
    if (cnt >= games.length) {
      setCnt(0)
    }
    else {
      setCnt(cnt => cnt += 1)
    }
    const game = games[cnt]
    const rowIdx = randNums && randNums[0].indexOf(game.lose_score % 10)
    const colIdx = randNums && randNums[1].indexOf(game.win_score % 10)
    const board_pos = rowIdx * 10 + colIdx
    console.log(game.square_id)
    const square = squares && squares.find(square => square.board_pos === board_pos)
    const updateGame = { "square_id" : square.id }
    console.log(updateGame)
    //Add game to square connector here....
    fetch(`/games/${game.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateGame),
    }).then(r => {
      if (r.ok) {
        r.json().then(data => {
          game.square_id = data.square_id
        })
      }
      else{
        r.json().then(data => console.log(data))
      }
    })
    setShowGames([...showGames, game])
    const updatedGames = [...games].map(g => g.id === game.id ? game : g)
    setGames(updatedGames)

    fetch('/squares').then(r=>r.json()).then(squares => setSquares(squares))
  }

  return (
    <Container>
      <Button onClick={handleGameCreate}>DrawGame</Button>
      <Col>
        {showGames && showGames.map(game => <div key={game.id}>Round: {game.round}, Score: {game.win_score}, {game.lose_score}</div>)}
      </Col>
    </Container>
  )
}

export default GameUI