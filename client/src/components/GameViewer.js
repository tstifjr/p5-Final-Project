import React, { useState, useContext, useEffect } from 'react'
import { Row, Button, Container, Table, ButtonGroup, Card, Col, Carousel } from 'react-bootstrap'
import { SquaresContext } from '../context/squares';
import { patchItem } from '../globalFunctions';
import BoardUI from './BoardUI'

function GameViewer() {
    const [board, setBoard] = useState(null)
    const [games, setGames] = useState([])
    const [cnt, setCnt] = useState(0)
    const { squares, setSquares } = useContext(SquaresContext)
    const [nextGame, setNextGame] = useState(null)

    useEffect(() => {
        fetch('/games')
            .then(r => r.json())
            .then(g => setGames(g))

        fetch('/boards/1')
            .then(r => r.json())
            .then(b => {
                setBoard(b)
                setCnt(b['game_cnt'])
            })

        if (!squares) {
            fetch('/squares').then(r => {
                if (r.ok) {
                    r.json()
                        .then(data => {
                            setSquares(data)
                        })
                }
            })
        }

    }, [setGames])


    const handleGameCreate = () => {

        const rowNums = board?.rownums.split(',').map(num => parseInt(num))
        const colNums = board?.colnums.split(',').map(num => parseInt(num))
        const game = games[cnt]
        const rowIdx = rowNums && rowNums.indexOf(game.lose_score % 10)
        const colIdx = colNums && colNums.indexOf(game.win_score % 10)
        const board_pos = rowIdx * 10 + colIdx
        const square = squares?.find(square => square.board_pos === board_pos)
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

        setNextGame(game)
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
    // console.log(nextGame)
    const completedGames = games && games.filter((game) => game.id <= cnt)
    // console.log(board)

    return (
        <>
            <Container className='d-flex' fluid>
                <Col lg={5}>
                    <Container className='text-center text-light' fluid>
                        <Container>
                            <h1 style={{ position: "relative", top: "50px" }}>Game Scores & Winners</h1>
                            {completedGames && <GameCardList games={completedGames} />}
                        </Container>

                        <Container className='d-flex justify-content-center mt-2' style={{ minHeight: "150px" }}>

                            {nextGame?.user?.username && <GameCard game={nextGame} />}
                        </Container>
                        {(!board || !board?.colnums) ? <p className='text-warning fw-bold'>Please Fill Out Board to See Next Game</p> :
                            <Button className='btn-danger p-3 mt-3 mb-2' onClick={handleGameCreate}>CLick To See The Next Game</Button>
                        }
                    </Container>
                </Col>
                <Col lg={7} className='mt-3'>
                    <Container className='position-end overflow-auto gx-0' style={{ width: "900px", height: "600px" }}>
                        <BoardUI squares={squares} board={board} />
                    </Container>
                </Col>
            </Container>
        </>
    )
}

export default GameViewer

function GameCard({ game }) {
    // console.log(game)
    return (
        <div className='d-flex justify-content-center'>
            <Card className='text-center pt-2 shadow-md' style={{ width: "600px", maxHeight: "300px" }}>
                <Card.Title>{game?.win_team}: {game?.win_score} vs {game?.lose_team}: {game?.lose_score}</Card.Title>
                <Card.Header>Round of {game?.round}</Card.Header>
                <Card.Body className='text-uppercase fw-bolder'>{`Winner is ${game?.user?.username}`}</Card.Body>
            </Card>
        </div>
    )
}

function GameCardList({ games }) {
    //implement a carsouel component
    // const cardPack1 = [<GameCard game={games[0]}/>, <GameCard game={games[1]}/>]
    // const cardPack2 = [<GameCard game={games[2]}/>, <GameCard game={games[3]}/>]
    const cardPack = games && games.map(game => <Carousel.Item key={game.id}><GameCard game={game} key={game.id} /> </Carousel.Item>)
    return (
        <>
            <Carousel className="d-flex align-items-center w-100"
                data-bs-theme="dark"
                style={{ width: "900px", height: "300px" }}
                controls={false}
                indicators={false}
                pause={false}
                ineterval={3000}>
                {cardPack}
            </Carousel>
        </>
    )
}