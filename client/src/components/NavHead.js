import React, { useContext } from 'react'
import { UserContext } from '../context/user'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { LinkContainer } from 'react-router-bootstrap'
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse'

function NavHead({ handleLogout }) {
    const { user } = useContext(UserContext)
    // console.log(user)
    return (
        <Navbar collapseOnSelect expand='lg' className="bg-body-secondary">
            <Navbar.Brand className='ms-3' style={{fontFamily:"fantasy"}}>NCAAB Squares </Navbar.Brand>

            <Navbar.Toggle aria-controls='basic-navbar-nav' />

            <Navbar.Collapse id="basic-navbar-nav" >
                <Nav className='container w-50'>
                    <Navbar.Text className='fs-4 text-danger' style={{fontFamily:"fantasy"}}>Welcome, {user && user.username}</Navbar.Text>
                </Nav>


                <Nav className='container justify-content-start' style={{fontFamily:"monospace"}}>
                    <LinkContainer to='/'><Nav.Link className='p-1'>Home</Nav.Link></LinkContainer>
                    <LinkContainer to='/about'><Nav.Link className='p-1'>About</Nav.Link></LinkContainer>
                    {/* <LinkContainer to='/boardManager'><Nav.Link className='p-1'>Edit Board</Nav.Link></LinkContainer> */}
                    <LinkContainer to={`/profile/${user.id}`}><Nav.Link className='p-1'>View Profile</Nav.Link></LinkContainer>
                    <LinkContainer to='/leaderboard'><Nav.Link className='p-1'>LeaderBoard</Nav.Link></LinkContainer>
                    <LinkContainer to='/gameviewer'><Nav.Link className='p-1'>View Games</Nav.Link></LinkContainer>
                </Nav>


            </ Navbar.Collapse>

            <Button className='btn-info me-2 justify-content-end' onClick={handleLogout}>LogOut</Button>



        </Navbar>

    )
}

export default NavHead