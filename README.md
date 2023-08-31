# Final Project:  NCAAB Squares Game

## Introduction
NCAAB Squares is a app for playing a game where players select squares on a board and winners are determined based on the final score of the game.  The app includes a signup/login for users, and once logged in users can select their squares.  After filling out the board, the rows and columns are given numbers and games are drawn to decide the winner.

## Setup
- runs on a modern browser, and uses python and node.js
- clone down the repository
- cd into the main directory
- run pipenv install
- cd into the client directory
- run npm install

- To Setup backend server
- run pipenv shell
- cd into server directory
- run python app.py

- to Open App in Browser
- open a new terminal
- cd into client directory
- run npm start

## Features // Concepts
- a user can create an account/login
- a user can join board and select which squares/how many they would like to play
- a user can view a leaderboard to see who has won the most games
- a user can view which games they have won, edit their square's styling
- a user can view board, and can click squares to view other users profile
- a user can view games that have been played, see scores, select next game to be played
- a user can fill out, reset, clear board to begin the game anew

## Routes // Components
## LeaderBoard
- Page that shows all the users and how many wins they have

## Profile
- Page showing an individual User, and the games they won
- show all squares owned by user and info regarding each square
- if viewing logged in user profile, can make edits (change square border color)

## Board Page
- Have a 10x10 board with 100 unassigned tiles (tiles are filled with squares when a user selects a tile to be their square) after setup, board rows and cols are assigned a num, which is passed to the squares that sit in that (row,col) pairing\
- col/row nums are randomly assigned only after all squares have been filled.  Board can be filled up or cleared/reset at any time as part of pre-build testing
- displays the board of squares (showing users who own which square)
- logged in user can edit board, squares they own, and unassigned squares (add squares/remove squares)
- has options to fill out board, clear board, assign col,row numbers

## Game Viewer
- shows all games that have been played and logged into the board
- allows adding the next game played to be added to the board

## Models
user---<square----<game
## User
- Create (Sign up new user)
- Read (Log in user, show user information)

## Square
- Create (Add active square assigned to User)
- Read (Show squares on board)
- Update (Edit col_num/row_num/user_id)
- Delete (free up square from user)

## Game
- Read (Show game attributes)
- Update (Edit square_id)

## Board
- Read (get board information)
- Update (set/rest row/col nums for board, track count for num of games played)

## Developer
- TJ Stifter