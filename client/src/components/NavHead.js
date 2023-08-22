import React, { useContext } from 'react'
import { UserContext } from '../context/user'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'

function NavHead({ handleLogout }) {
    const { user } = useContext(UserContext)
    // console.log(user)
    return (
        <Navbar className="bg-body-secondary">
            <Navbar.Brand href='/home'> <Link to ='/home'>NCAAB Squares</Link></Navbar.Brand>
            {/* <Navbar.Toggle aria-controls='responsive-navbar-nav' /> */}
            <Navbar.Text>Welcome, {user && user.username}</Navbar.Text>
                <Container className='justify-content-center w-50'>
                   
                </Container>
            <Navbar.Collapse className="justify-content-end">
                <Button className='btn-info me-2' onClick={handleLogout}>LogOut</Button>
            </Navbar.Collapse>



        </Navbar>

    )
}

export default NavHead