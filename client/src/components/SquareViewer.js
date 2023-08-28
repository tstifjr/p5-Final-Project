import React from 'react'
import { useHistory } from 'react-router-dom'
import { Row, Col, Container, Card } from 'react-bootstrap'
function SquareViewer({ square, id }) {
    const history = useHistory()
    const handleView = () => {
        // console.log(square.user.id)
        history.push(`/profile/${square.user.id}`)
    }
    return (
        <>
            {square.user ?
                <div className= "border" style={{width: "150px", height:"150px"}} onClick={handleView}>
                    <header className='text-center'><p>{square?.user?.username}</p></header>

                    {square.games.map((g) => <i key={g.id}>!@$</i>)}

                </div>
                :
                <div className= "border h-100" style={{width: "150px" }}>
                </div>
            }

        </>
    )
}

export default SquareViewer