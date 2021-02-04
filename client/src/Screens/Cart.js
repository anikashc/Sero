import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Button, Card, Container} from 'react-bootstrap'
import Message from '../Components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

const Cart = ({history}) => {
    const cart = useSelector(state=>state.cart)
    const dispatch = useDispatch()
    const {cartItems,eateryDetails}=cart
    let browserHistory = useHistory();
    const removeFromCartHandler = (id) =>{
        dispatch(removeFromCart(id,eateryDetails))
    }
    const addToCartHandler = (item,qty) =>{
        
        const item1={
            _id: item.product,
            name: item.name,
            cost: item.cost,
            category: item.category,
            image: item.image,
            isAvailable: item.isAvailable,
        }
        dispatch(addToCart(item1,eateryDetails,qty))
    }
    const checkoutHandler =() =>{
        history.push('/checkout')
    }
    return (
        <React.Fragment>
            <Container fluid>
                <Row><Button className='mt-3' onClick={()=>browserHistory.goBack()}>Go Back</Button></Row>
                <Row><h3>Your Cart<small class="text-muted"> from {eateryDetails.name}</small></h3></Row>
                {(cartItems.length === 0 || !eateryDetails) ? (
                    <Message>
                        Your cart is empty  <Button><Link to='/'>Order!</Link></Button>
                    </Message>
                ):(
                    <div>
                    <Row md={1} lg={1} xl={1} noGutters={true}>   
                        
                        <ListGroup>
                            
                            {cartItems.map((item) => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                
                                <Col md={4} xs={3} mx-auto align='center'>
                                    {item.name}
                                </Col>
                                
                                <Col md={4} xs={5} mx-auto align='center'>
                                <Button size='sm' className='mx-2' onClick={()=> {
                                        addToCartHandler(item,item.qty-1)
                                        }} disabled={item.qty===0}>
                                            <i class="fas fa-chevron-left"></i>
                                    </Button>
                                    
                                    {item.qty}
                                
                                    <Button size='sm' className='mx-2' onClick={()=> {
                                        addToCartHandler(item,item.qty+1)
                                        }}>
                                            <i class="fas fa-chevron-right"></i>
                                    </Button>
                                </Col >
                                <Col xs={2} md={1}  align='center'>₹{item.cost*item.qty}</Col>
                                <Col md={2} xs={1} align='center'>
                                    <Button
                                    size='sm' mx-0
                                    onClick={() => removeFromCartHandler(item.product)}
                                    >
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </Col>
                                
                                
                                </Row>
                            </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Row>

                    <Row className='my-4'>

                        <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item >
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
                                    disabled={cartItems.length === 0 || !eateryDetails}
                                    onClick={checkoutHandler}
                                >
                                    Proceed To Checkout
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                        </Card>
                        
                    </Row>
                </div>
                )}
                
            </Container>
        </React.Fragment>
        
        
    )
}

export default Cart
