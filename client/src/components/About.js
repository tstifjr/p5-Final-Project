import React from 'react'

function About() {
  return (
    <div className='container fs-4 text-warning' style={{marginTop:"8%"}}>
      <h2 className='text-center text-light mb-1'><u>Introduction</u></h2>
      <p className='mt-2'>Hello, NCAA Squares is a game designed to be played during March Madness.  The game consists of a board 10x10, where all the players select squares for themselves, and as individual basketball games are finished the final score is used to determine  a winner</p>
      <h2 className='text-center text-light mb-2'><u>How to Play</u></h2>
      <p> As a logged in user, you can select any square not already owned and add it to your profile.  This is done by pressing the edit board button.  </p>
      <p> After a user is finished selecting their squares, they can lock the board.  For the pre-build, after locking the board, you are given a few options.  You can fill out any remaining squares, which randomly assigns a user to that square, you can clear the board which removes all users from the board.  Further, you can assign numbers to the board that go on the cols and rows.  After assigning rows and col nums, the board can no longer be edited, but you can view the game page to test out how played out games affect the board.  There is also an option to reset the board, which removes the set row and col nums, and resets the games played back to zero</p>
      <p> On the Game Page, you simply have to click to draw the next game, which will mark it as a played game and a winner will be assigned for that game</p>
    </div>
  )
}

export default About