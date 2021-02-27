import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col,Button, Form, ListGroup, Tab, Row} from 'react-bootstrap'
import {saveCustomerMeta} from '../actions/cartActions'
import FormContainer from '../Components/FormContainer'
import CheckoutSteps from '../Components/CheckoutSteps'
import Message from '../Components/Message'
import { Link } from 'react-router-dom'



const Payment = ({history}) => {
    const cart = useSelector(state=>state.cart)
    const {cartItems, eateryDetails, customerMeta}=cart

    const dispatch = useDispatch()
    
    //console.log(customerMeta)

    // const orderCreate = useSelector((state) => state.orderCreate)
    // const { order, success, error } = orderCreate
    
    useEffect(() => {

        if(!customerMeta){
            history.push('/checkout');
        }
        else{
            // if (success) {
            //     history.push(`/order/${order._id}`)
            //     dispatch({ type: USER_DETAILS_RESET })
            //     dispatch({ type: ORDER_CREATE_RESET })
            // }
        }

    }, [history, customerMeta, eateryDetails])

    //   Calculate prices
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    cart.itemsPrice = addDecimals(
        cartItems.reduce((acc, item) => acc + item.cost * item.qty, 0)
    )

    cart.taxPrice = addDecimals(Number((0.05 * cart.itemsPrice).toFixed(2)))
    cart.totalPrice = (
        Number(cart.itemsPrice) +
        Number(cart.taxPrice)
    ).toFixed(2)

    
    const placeOrderHandler = () => {
        // dispatch(
        //   createOrder({
        //     orderItems: cart.cartItems,
        //     shippingAddress: cart.shippingAddress,
        //     paymentMethod: cart.paymentMethod,
        //     itemsPrice: cart.itemsPrice,
        //     shippingPrice: cart.shippingPrice,
        //     taxPrice: cart.taxPrice,
        //     totalPrice: cart.totalPrice,
        //   })
        // )
        history.push('/orderSummary');
    }
    
    
    return (
        <>
            <CheckoutSteps step1 step2/>
            <FormContainer>
                <h2>Payment</h2>
            
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        
                        <p>
                            <strong>Customer Details: </strong> <br />
                            {customerMeta.name}<br />
                            {customerMeta.phone}
                        </p>   
                    </ListGroup.Item>
                    <h4 className="py-3">Order from <Link to={`/menu/${eateryDetails._id}`}>
                            {eateryDetails.name}</Link>
                    </h4>
                    <ListGroup.Item>
                        <Row>
                        <Col>Items</Col>
                        <Col>₹{cart.itemsPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                        <Col>GST</Col>
                        <Col>₹{cart.taxPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                        <Col>Total</Col>
                        <Col>₹{cart.totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                            <Row>
                                <Col sm={6}>
                                <ListGroup>
                                    <ListGroup.Item action href="#link1">
                                    UPI
                                    </ListGroup.Item>
                                    <ListGroup.Item action href="#link2">
                                    PayTM
                                    </ListGroup.Item>
                                </ListGroup>
                                </Col>
                                <Col sm={6}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="#link1">
                                    <h6>{eateryDetails.upi}</h6>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="#link2">
                                    <h6>{eateryDetails.paytm}</h6>
                                    </Tab.Pane>
                                </Tab.Content>
                                </Col>
                                
                            </Row>
                        </Tab.Container>
                    </ListGroup.Item>

                </ListGroup>
                <ListGroup.Item>
                {/* {error && <Message variant='danger'>{error}</Message>} */}
                </ListGroup.Item>
                
                <Button
                    type='button'
                    className='btn-block'
                    disabled={cartItems.length === 0 || !eateryDetails}
                    onClick={placeOrderHandler}
                >
                    Check Payment Status
                </Button>            
            </FormContainer>

            
        </>
    )
}

export default Payment


