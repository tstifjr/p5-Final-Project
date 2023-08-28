// import React, { useContext } from 'react'
// import Card from 'react-bootstrap/Card'
// import Button from 'react-bootstrap/Button'
// import { UserContext } from '../context/user'
// import { SquaresContext } from '../context/squares'

// function SquareCard({ square }) {
//   const { user } = useContext(UserContext)
//   const { squares, setSquares } = useContext(SquaresContext)

//   const highlight = square.user_id === user.id ? 'border border-secondary' : "border"
//   const handleRemoveSq = () => {

//     fetch(`/squares/${square.id}`, {
//       method: "DELETE",
//     })
//       .then(r => {
//         if (r.status === 204) {
//           console.log('delete sucessful')
//           const now_deleted = squares.filter(s => s.id !== square.id)
//           setSquares(now_deleted)
//         }
//       })

//   }

//   return (
//     <div className="border text-center p-3 align-items-center" style={{ width: "150px", height: '150px' }}>
//       <div className='p-2 text-center'>
//         {square?.user?.username}
//         <div className='p-1'>
//           {square.user_id === user.id && <Button onClick={handleRemoveSq}>Remove</Button>}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default SquareCard
