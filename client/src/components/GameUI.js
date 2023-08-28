import React, { useEffect, useState, useContext } from 'react'
import { Container, Button, Col, Row } from 'react-bootstrap'
import { SquaresContext } from '../context/squares'
import { patchItem } from '../globalFunctions'

function GameUI({ board }) {
  const [games, setGames] = useState([])
  const [cnt, setCnt] = useState(0)
  const { squares, setSquares } = useContext(SquaresContext)

  useEffect(() => {
    fetch('/games')
      .then(r => r.json())
      .then(games => setGames(games))

    board && setCnt(board['game_cnt'])
  }, [board])


  const handleGameCreate = () => {

    const rowNums = board?.rownums.split(',').map(num => parseInt(num))
    const colNums = board?.colnums.split(',').map(num => parseInt(num))
    const game = games[cnt]
    const rowIdx = rowNums && rowNums.indexOf(game.lose_score % 10)
    const colIdx = colNums && colNums.indexOf(game.win_score % 10)
    const board_pos = rowIdx * 10 + colIdx
    const square = squares.find(square => square.board_pos === board_pos)
    if (!square) console.log("no PERSON here")
    else {
      const updateGame = { "square_id": square.id }
     
      //Add game to square
      patchItem(game, updateGame, `/games/${game.id}`)
      const updatedGames = [...games].map(g => g.id === game.id ? game : g)
      setGames(updatedGames)
    }

    //reFRESHES board BY FETCH ING sQUARES
    fetch('/squares').then(r => r.json()).then(squares => setSquares(squares))

    //increase game counter
    if (cnt >= games.length) {
      patchItem(board, { "game_cnt": 0 }, `/boards/1`)
      setCnt(0)
    }
    else {
      patchItem(board, { "game_cnt": cnt + 1 }, `/boards/1`)
      setCnt(cnt => cnt += 1)
    }
  }

  const completedGames = games.filter((game) => game.id <= cnt)
  return (
    <Container>
      <Button onClick={handleGameCreate} disabled= {!board || !board?.colnums}>DrawGame</Button>
      <Col>
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
