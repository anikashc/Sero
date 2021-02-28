import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col,Button, ListGroup, Tab, Row} from 'react-bootstrap'
// import {saveCustomerMeta} from '../actions/cartActions'
import FormContainer from '../Components/FormContainer'
import CheckoutSteps from '../Components/CheckoutSteps'
import Message from '../Components/Message'
import {createOrder} from '../actions/orderActions'
import { Link } from 'react-router-dom'
import {ORDER_CREATE_RESET} from '../constants/orderConstants'



const Payment = ({history}) => {
    const [paymentMethod, setPaymentMethod] = useState('UPI')
  
    const cart = useSelector(state=>state.cart)
    const {cartItems, eateryDetails, customerMeta}=cart

    const dispatch = useDispatch()
    


    const orderCreate = useSelector((state) => state.orderCreate)
    const { order, success, error } = orderCreate
    
    useEffect(() => {

        if(!customerMeta){
            history.push('/checkout');
        }
        else{
            if (success) {
              
                //console.log("Order is created but wait for confirmation")
                history.push(`/orderSummary/${order._id}`)
                dispatch({ type: ORDER_CREATE_RESET })
            }
        }

    }, [history, customerMeta, success, eateryDetails])

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

                </ListGroup>
                <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
                </ListGroup.Item>
                
                <Button
                    type='button'
                    className='btn-block'
                    disabled={cartItems.length === 0 || !eateryDetails}
                    onClick={placeOrderHandler}
                >
                    Place Order
                </Button>         
            </FormContainer>

            
        </>
    )
}

export default Payment


