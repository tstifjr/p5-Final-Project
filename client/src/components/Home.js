import React, { useEffect, useContext, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { UserContext } from '../context/user'
import { SquaresContext } from '../context/squares';
import BoardUI from './BoardUI'
import { Container, Button } from 'react-bootstrap'
function Home() {
    const { user, setUser } = useContext(UserContext)
    const { squares, setSquares } = useContext(SquaresContext)
    const [board, setBoard] = useState(null)
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        fetch('/boards/1')
            .then(r => r.json())
            .then(board => setBoard(board))
    }, [setBoard])

    useEffect(() => {
        fetch('/squares').then(r => {
            if (r.ok) {
                r.json()
                    .then(data => {
                        setSquares(data)
                    })
            }
        })
    }, [setSquares])

    return (
        user ? <div className='App'>
            This is the Homepage
            <div>
                <Container className='text-center d-flex justify-content-between'>
                    {!edit ? <h2>View Board</h2> : <h2>Edit Board</h2>}
                    {!edit ? <Button className='justify-content-end' onClick={()=>setEdit(!edit)}>Edit Board</Button> : <Button className='justify-content-end' onClick={()=>setEdit(!edit)}>View Board</Button>}
                </Container>
                <Container className='overflow-auto' style={{ width: "1200px", height: "720px" }}>
                    <BoardUI squares = {squares} board = {board} edit = {edit} />
                </Container>
            </div>
        </div>
            :
            <div></div>

    )
}

export default Home
