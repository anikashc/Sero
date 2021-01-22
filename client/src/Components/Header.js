import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';

const Header = () => {
    return (
        <header>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Sero</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}

export default Header
