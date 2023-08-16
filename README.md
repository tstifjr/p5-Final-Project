# p5-Final-Project

## Tuesday
-Build Out Model For user on Backend
-Hookup user db to front end to begin to setup login/signup/authentication w/passwords


## Models

## User
- Create (Sign up new user)
- Read (Log in user, show user information)
- Delete (delete a user)

## Square
- Create (Add active square assigned to User)
- Read (Show squares on board)
- Update (Edit Square position/col_num/row_num)
- Delete (free up square from user//on cascade of user delete too)

## Game
- Read (Show game attributes)
- Create (add new games) **(stretch goal)

## Board Setup
- Have a 10x10 board with 100 unassigned tiles (tiles are filled with squares when a user selects a tile to be their square)
after setup, board rows and cols are assigned a num, which is passed to the squares that sit in that (row,col) pairing\
- can have a randomizer to randomly assign row,col nums

## Board Play
-Have a randomizer to select a new game to be played and assigned to a square

## LeaderBoard
- Page that shows all the users and how many wins they have (squares that have a game)

## UserProfile
- maybe just a card that shows which squares you have, and if they have won any games