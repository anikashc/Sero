import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
import { Col,Button, ListGroup, Tab, Row} from 'react-bootstrap'
// import {saveCustomerMeta} from '../actions/cartActions'
import FormContainer from '../Components/FormContainer'
import CheckoutSteps from '../Components/CheckoutSteps'
import Message from '../Components/Message'
import {createOrder, editOrder} from '../actions/orderActions'
import { Link } from 'react-router-dom'
import {ORDER_CREATE_RESET, ORDER_EDIT_RESET} from '../constants/orderConstants'

let socket

const Payment = ({history,location}) => {
    const [paymentMethod, setPaymentMethod] = useState('null')
  

    const redirect = location.search? location.search.split('=')[1]:null


    const cart = useSelector(state=>state.cart)
    const {cartItems, eateryDetails, customerMeta}=cart

    const dispatch = useDispatch()
    
    const ENDPOINT ='localhost:5000'

    const orderCreate = useSelector((state) => state.orderCreate)
    const { order, success, error } = orderCreate

    // if the order is edited
    const orderEdit = useSelector((state) => state.orderEdit)
    const { order: orderEditDetails, success: successEdit, error: errorEdit } = orderEdit
    
    useEffect(() => {
        socket =io.connect(ENDPOINT, {reconnect: true})
        if(!customerMeta){
            history.push('/checkout');
        }
        else{
            if (success) {
                
                socket.emit('orderPlaced')
                //console.log("Order is created but wait for confirmation")
                history.push(`/orderSummary/${order._id}`)
                dispatch({ type: ORDER_CREATE_RESET })
            }
            if (successEdit) {
                socket.emit('orderPlaced')
                //console.log("Order is created but wait for confirmation")
                history.push(`/orderSummary/${orderEditDetails._id}?redirect=confirmAddItems`)
                dispatch({ type: ORDER_EDIT_RESET })
            }
        }
        return () => {
            //socket.emit('disconnect')
            socket.off()
        }

    }, [history, customerMeta, success, eateryDetails, ENDPOINT, successEdit])

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

        
            if(redirect){
                dispatch(
                    editOrder({
                        eateryId: eateryDetails._id,
                        orderId: redirect,
                        orderItems: cart.cartItems,
                        itemsPrice: cart.itemsPrice,
                        taxPrice: cart.taxPrice,
                        totalPrice: cart.totalPrice,
                    })
                )
            }
            else{

                dispatch(
                  createOrder({
                    eateryId: eateryDetails._id,
                    customerMeta: {
                        name: customerMeta.name,
                        phone: customerMeta.phone,
                        email: customerMeta.email
                    },
                    orderItems: cart.cartItems,
                    paymentMethod: paymentMethod,
                    itemsPrice: cart.itemsPrice,
                    paymentType: cart.customerMeta.paymentType,
                    taxPrice: cart.taxPrice,
                    totalPrice: cart.totalPrice,
                  })
                )
            }
        
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
                    {customerMeta.paymentType==='payNow'?(
                        <ListGroup.Item>
                            <Tab.Container id="list-group-tabs-example">
                                <Row>
                                    <Col sm={6}>
                                    <ListGroup>
                                        <ListGroup.Item action href="#link1" onClick={(e)=>setPaymentMethod('UPI')}>
                                        UPI
                                        </ListGroup.Item>
                                        <ListGroup.Item action href="#link2" onClick={(e)=>setPaymentMethod('PayTM')}>
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
                    ):(
                        null
                    )}
                    

                </ListGroup>
                <ListGroup.Item>
                {(error || errorEdit) && <Message variant='danger'>{error || errorEdit}</Message>}
                </ListGroup.Item>
                <Button
                    type='button'
                    className='btn-block'
                    disabled={cartItems.length === 0 || !eateryDetails || (paymentMethod==='null' && cart.customerMeta.paymentType==='payNow')}
                    onClick={placeOrderHandler}
                >
                    Place Order
                </Button>         
            </FormContainer>

            
        </>
    )
}

export default Payment


