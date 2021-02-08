import React from 'react'
import { LinkContainer} from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'

const Header = () => {

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {

        dispatch(logout())
    }

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
                            
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>

                                    <LinkContainer to='/profile'>
                                            <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item onClick={logoutHandler}>Log Out</NavDropdown.Item>

                                </NavDropdown>
                            ) : <>
                                <LinkContainer to='/login'>
                                    <Nav.Link><i className='fas fa-user'></i>Log In</Nav.Link>
                                </LinkContainer>

                                <LinkContainer to='/register'>
                                    <Nav.Link><i className='fas fa-user-plus'></i>Register</Nav.Link>
                                </LinkContainer>
                            </> }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
        </header>
    )
}

export default Header
