import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/user'
import { useParams } from 'react-router-dom'

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

  const squareCardList = user && user.squares.map(square => <SquareCard square={square} />)
  const keyedSquares = React.Children.toArray(squareCardList)

  const gamesList = user && user.games.map(game => <div><span>{game.win_team} : {game.win_score}</span> <span>{game.lose_team} : {game.lose_score}</span></div>)
  const keyedGamesList = React.Children.toArray(gamesList)
  return (
    <div className='App'>
      <h2>Welcome, {user && user.username}</h2>
      <h3> Your Squares are:
      </h3>
      {keyedSquares}
      {user && user.games_won > 0 ?
        <div>
          <h4>You have won: {user.games_won} games</h4>
          <h5>Games List</h5>
          {keyedGamesList}
        </div> : <></>}
    </div>
  )
}

export default Profile

function SquareCard({ square }) {
  const sqNum = `${square.board_pos}`
  const renderNums = `${square.col_num}, ${square.row_num}`
  return (
    <div>
      <h4>{sqNum}</h4>
      {square.col_num && <h4>{renderNums}</h4>}
    </div>
  )
}