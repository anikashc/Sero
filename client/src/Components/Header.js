import React from 'react'
import { LinkContainer} from 'react-router-bootstrap'
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {
    return (
        <header>
            <Navbar  collapseOnSelect className='navbar navbar-expand-lg navbar-light bg-light'>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>SERO</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            
                            <LinkContainer to='/login'>
                                <Nav.Link><i className='fas fa-user'></i>Log In</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to='/register'>
                                <Nav.Link><i className='fas fa-user-plus'></i>Register</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
        </header>
    )
}

export default Header
