import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Button, Card, Container} from 'react-bootstrap'
import Message from '../Components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

const Cart = () => {
    const cart = useSelector(state=>state.cart)
    const dispatch = useDispatch()
    const {cartItems,eateryId}=cart
    let browserHistory = useHistory();
    const removeFromCartHandler = (id) =>{
        dispatch(removeFromCart(id,eateryId))
    }
    const addToCartHandler = (id,qty) =>{
        dispatch(addToCart(id,eateryId,qty))
    }
    const checkoutHandler =() =>{
        console.log('checkout')
    }
    return (
        <React.Fragment>
            <Container className='container'>
                <Row><Button onClick={()=>browserHistory.goBack()}>Go Back</Button></Row>
                <Row><h1>Cart</h1></Row>
                <Row>   
                        
                        {(cartItems.length === 0 || !eateryId) ? (
                        <Message>
                            Your cart is empty  <Button><Link to='/'>Order!</Link></Button>
                        </Message>
                        ) : (
                        <ListGroup>
                            
                            {cartItems.map((item) => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                
                                <Col>
                                    {item.name}
                                </Col>
                                <Col>₹{item.cost}</Col>
                                <Col md='auto'>
                                <Button size='sm' className='mx-3' onClick={()=> {
                                        addToCartHandler(item.product,item.qty-1)
                                        }}>
                                            <i class="fas fa-chevron-left"></i>
                                    </Button>
                                    
                                    {item.qty}
                                
                                    <Button size='sm'className='mx-3' onClick={()=> {
                                        addToCartHandler(item.product,item.qty+1)
                                        }}>
                                            <i class="fas fa-chevron-right"></i>
                                    </Button>
                                </Col>
                                <Col>{item.qty}</Col>
                                <Col>
                                    <Button
                                    size='sm'
                                    onClick={() => removeFromCartHandler(item.product)}
                                    >
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </Col>
                                <Col>₹{item.cost*item.qty}</Col>
                                
                                </Row>
                            </ListGroup.Item>
                            ))}
                        </ListGroup>
                        )
                        }
                </Row>
                <Row className='my-4'>

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
                                disabled={cartItems.length === 0 || !eateryId}
                                onClick={checkoutHandler}
                            >
                                Proceed To Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                    </Card>
                    
                </Row>
            </Container>
        </React.Fragment>
        
        
    )
}

export default Cart
