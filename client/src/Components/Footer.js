import React from 'react'
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap'
import {useSelector} from 'react-redux' 
import { Link } from 'react-router-dom'
import { LinkContainer} from 'react-router-bootstrap'


const Footer = () => {
    const cart = useSelector(state=>state.cart)
    const {cartItems}=cart
    return (
        <footer>
            <Container>
                <Row>
                    {cartItems.length?
                        (
                        <Navbar bg="light" fixed="bottom">
                            <Container>
                                
                                <Nav className="ml-auto">
                                    <LinkContainer to='/cart'>
                                        <Nav.Link>Cart</Nav.Link>
                                    </LinkContainer>
                                </Nav>
                                
                            </Container>
                        </Navbar> 
                        )
                    :
                        null
                    }
                </Row>
                <Row>
                    <Col className='text-center py-3'>
                    CopyRight &copy; Sero
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
