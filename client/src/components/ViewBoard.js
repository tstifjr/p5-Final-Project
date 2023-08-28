// import React, { useState, useContext, useEffect } from 'react'
// import { Container, Row, Col } from 'react-bootstrap'
// import { SquaresContext } from '../context/squares';
// import { initializeBoard, genRandNums } from '../context/globalFunctions';
// import BuildBoard from './BuildBoard';

// function ViewBoard() {
//     const { squares, setSquares } = useContext(SquaresContext)

//     useEffect(() => {
//         fetch('/squares').then(r => {
//             if (r.ok) {
//                 r.json()
//                     .then(data => {
//                         setSquares(data)
//                     })
//             }
//         })
//     }, [setSquares])

//     return (
//         <>
//             <Container className='text-center'>
//                 <h2>ViewBoard</h2>
//             </Container>
//             <Container fluid>
//                 {squares && <BuildBoard squares={squares} squareType={"SquareView"}/>}
//             </Container>



//         </>

//     )
// }

// export default ViewBoard
