import React from 'react'
import Col from 'react-bootstrap/Col'
function Tile({ squareObj, id }) {

    return (
        <>
            <Col>{squareObj.user ? squareObj?.user?.username : "Blank"}</Col>
        </>
    )
}

export default Tile