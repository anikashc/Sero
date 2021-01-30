import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Button, Card, Container} from 'react-bootstrap'
import Message from '../Components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

const Cart = ({history}) => {
    const cart = useSelector(state=>state.cart)
    const dispatch = useDispatch()
    const {cartItems,eateryId}=cart
    let browserHistory = useHistory();
    const removeFromCartHandler = (id) =>{
        dispatch(removeFromCart(id,eateryId))
    }
    const checkoutHandler =() =>{
        console.log('checkout')
    }
    return (
        <Container fluid>
            <Row><Button onClick={()=>browserHistory.goBack()}>Go Back</Button></Row>
            <Row>
                
                <Col md={8}>
                    <h1>Cart</h1>
                    {cartItems.length === 0 ? (
                    <Message>
                        Your cart is empty  <Button></Button><Link to='/'>Order!</Link>
                    </Message>
                    ) : (
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col md={5}>Items</Col>
                                <Col md={1}>Price</Col>
                                <Col md={2}>Quantity</Col>
                                <Col md={1}></Col>
                                <Col md={1}>Total</Col>
                            </Row>
                        </ListGroup.Item>
                        {cartItems.map((item) => (
                        <ListGroup.Item key={item.product}>
                            <Row>
                            
                            <Col md={5}>
                                {item.name}
                            </Col>
                            <Col md={1}>₹{item.cost}</Col>
                            <Col md={2}>{item.qty}</Col>
                            <Col md={1}>
                                <Button
                                size='sm'
                                onClick={() => removeFromCartHandler(item.product)}
                                >
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </Col>
                            <Col md={1}>₹{item.cost*item.qty}</Col>
                            
                            </Row>
                        </ListGroup.Item>
                        ))}
                    </ListGroup>
                    )}
                </Col>
                <Col md={3}>
                    <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                        <h3>
                            Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                            items
                        </h3>
                        ₹
                        {cartItems
                            .reduce((acc, item) => acc + item.qty * item.cost, 0)
                            .toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                type='button'
                                className='btn-block'
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                            >
                                Proceed To Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
        
    )
}

export default Cart
