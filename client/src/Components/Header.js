import React from 'react'
import { LinkContainer} from 'react-router-bootstrap'
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {
    return (
        <header>
            <Navbar  collapseOnSelect className='navbar navbar-expand-lg navbar-dark bg-dark'>
                <Container id="navbarColor02">
                    <LinkContainer to='/'>
                        <Navbar.Brand>SERO</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Item className='active'>
                                <LinkContainer to='/login'>
                                    <Nav.Link><i className='fas fa-user px-2'></i>Log In</Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                            
                            {/* <Nav.Item className='active'>
                                <LinkContainer to='/register'>
                                    <Nav.Link><i className='fas fa-user-plus'></i>Register</Nav.Link>
                                </LinkContainer>
                            </Nav.Item> */}

                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
        </header>
    )
}

export default Header
