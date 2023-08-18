import React, { useEffect, useState } from 'react'

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
    return (<div>
      <span>{user.username}:  {user.games_won}</span>
    </div>)
  })
  const keyed_leaders = React.Children.toArray(leaders)

  return (
    <div>LeaderBoard
      {keyed_leaders}
    </div>
  )
}

export default LeaderBoard