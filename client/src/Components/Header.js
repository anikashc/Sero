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
            <Navbar  collapseOnSelect className='navbar navbar-expand-lg navbar-dark bg-dark'>
                <Container id="navbarColor02">
                    <LinkContainer to='/'>
                        <Navbar.Brand>SERO</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            
                            
                            {userInfo? (
                                userInfo.userType===1 ? (
                                    <NavDropdown title='Admin' id='adminmenu' className='active'>

                                        <LinkContainer to='/admin/userlist'>
                                            <NavDropdown.Item>Users</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/admin/eaterylist'>
                                            <NavDropdown.Item>Eateries</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/admin/orderlist'>
                                            <NavDropdown.Item>Orders</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/login'>
                                            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                        </LinkContainer>
                                        

                                    </NavDropdown>
                                ) : (
                                    <NavDropdown title={userInfo.name} id='username' className='active'>

                                        <LinkContainer to='/dashboard'>
                                            <NavDropdown.Item>Dashboard</NavDropdown.Item>
                                        </LinkContainer>

                                        <LinkContainer to='/login'>
                                            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                        </LinkContainer>

                                    </NavDropdown>
                                )
                                
                            ) : (
                                <>
                                    <Nav.Item className='active'>
                                        <LinkContainer to='/login'>
                                            <Nav.Link><i className='fas fa-user px-2'></i>Login</Nav.Link>
                                        </LinkContainer>
                                    </Nav.Item>
                                </>
                            )}
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
        </header>
    )
}

export default Header
