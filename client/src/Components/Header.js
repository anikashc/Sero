import React from 'react'
import { LinkContainer} from 'react-router-bootstrap'
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {
    return (
        <header>
            <Navbar bg="light" expand="lg" collapseOnSelect className='navbar navbar-expand-lg navbar-dark bg-dark'>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>SERO</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            
                            <LinkContainer to='/login'>
                                <Nav.Link><i className='fas fa-user'></i>Sign In</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
