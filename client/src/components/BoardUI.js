import React, { useState, useContext, useEffect } from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap'
import { SquaresContext } from '../context/squares';
import { initializeBoard } from '../globalFunctions';
import SquareViewer from './SquareViewer'
import SquareEditor from './SquareEditor';

function BoardUI({ board, edit }) {
    const { squares, setSquares } = useContext(SquaresContext)

    const rowNums = board?.rownums?.split(',').map(num => parseInt(num))
    const colNums = board?.colnums?.split(',').map(num => parseInt(num))
    const [boardArr, emSqArr] = initializeBoard(squares)
    const buildTable = boardArr && Array.from({ length: 10 }).map((x, j) => {
        const filterRow = boardArr && boardArr.filter((_, i) => i <= j * 10 + 9 && i >= (j) * 10)
        const displayRow = filterRow.map((square, i) => <td key={i} className='table-hover'>
            {edit && !board?.rownums ?
                <SquareEditor key={square.id} square={square} pos={j * 10 + (i)} /> :
                <SquareViewer key={square.id} square={square} />}
        </td>)
        return (
            <tr className=''>
                {rowNums && <th className='sticky'><div className="text-center pt-4 mt-3" style={{width:"24px"}}><p>{rowNums[j]}</p></div></th>}
                {displayRow}
            </tr>
        )
    })
    const keyedBoard = React.Children.toArray(buildTable)
    return (

        <Table borderless className='mb-0'>
            <thead className='sticky-top table-dark text-center' style={{top:"-5px"}}>
                {colNums && <tr>
                    <th>#</th>
                    {Array.from({ length: 10 }).map((_, i) => (
                        <th key={i}>{colNums[i]}</th>
                    ))}
                </tr>}
            </thead>
            <tbody>
                {keyedBoard}
            </tbody>
        </Table>

    )

}


export default BoardUI
