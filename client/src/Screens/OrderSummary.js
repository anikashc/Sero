import React, { useState, useEffect } from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button,Tab } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import {
  getOrderDetails,
  paymentDone
} from '../actions/orderActions'
import {
  listEateryDetails,
} from '../actions/eateryActions'
import { ORDER_PAYMENT_DONE_RESET } from '../constants/orderConstants'
import { CART_RESET } from '../constants/cartConstants'



let socket
const OrderSummary = ({ match}) => {
  const orderId = match.params.id


  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const eateryDetails = useSelector((state) => state.eateryDetails)
  const {loading:eateryLoading, error: eateryError, eatery} = eateryDetails

  const [paymentMethod, setPaymentMethod] = useState('null')

  const orderCustomerPaid = useSelector((state) => state.orderCustomerPaid)
  const { loading: loadingPay, success: successPay, error: errorPay } = orderCustomerPaid


  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.cost * item.qty, 0)
    )
  }
  const ENDPOINT ='localhost:5000'
  useEffect(() => {
    socket =io.connect(ENDPOINT, {reconnect: true})
    
    if (!order  || order._id !== orderId) {
 
      dispatch(getOrderDetails(orderId))
      
    }  
    else if(!eatery){
      dispatch(listEateryDetails(order.eatery))
    } 
    //console.log(socket)
    console.log(successPay)
    if(successPay){
      const eateryIdforSocket=order.eatery
      dispatch(getOrderDetails(orderId))
      socket.emit('customerPaid',{eateryIdforSocket})
      dispatch({ type: ORDER_PAYMENT_DONE_RESET }) 
    }


    

    socket.on('paidOrder', ({orderPaidId})=>{
      // console.log(orderPaidId)
      if(orderPaidId===orderId){
        // console.log('Paid for your Order')
        dispatch(getOrderDetails(orderId))
      }
    }) 
    socket.on('cancelledOrder', ({orderCancelledId})=>{
      // console.log(orderCancelledId)
      if(orderCancelledId===orderId){
        // console.log('Cancelled for your Order')
        dispatch(getOrderDetails(orderId))
      }
    })
    socket.on('completedOrder', ({orderCompletedId})=>{
      // console.log(orderCompletedId)
      if(orderCompletedId===orderId){
        // console.log('Completed for your Order')
        dispatch(getOrderDetails(orderId))
        dispatch({type: CART_RESET})
      }
    })

    return () => {
      //socket.emit('disconnect')
      socket.off()
    }
    
  }, [dispatch, orderId, order, ENDPOINT,eatery,successPay])


  const paymentHandler = () =>{
    dispatch(paymentDone({
        _id: orderId,
        paymentMethod: paymentMethod
    }
    ))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h2>Order Summary {order._id}</h2>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>Details</h3>
              <Row>
                <Col>
                    <p>
                        <strong>Name: </strong> {order.customerMeta.name}
                    </p>  
                </Col>
                <Col>
                    <p>
                        <strong>Phone: </strong> {order.customerMeta.phone}
                    </p> 
                </Col>
                <Col>
                    <p>
                        <strong>Email: </strong> <a href={`mailto:${order.customerMeta.email}`}>{order.customerMeta.email}</a>
                    </p> 
                </Col>
              </Row>
              <Row>
                  <Col>
                    <p>
                        <strong>Eatery: </strong> <Link to={`/menu/${order.eatery}`}>
                            {eatery.name}</Link>
                    </p>
                  </Col>
              </Row>
            
              
              {order.completed ? (
                <Message variant='success'>
                  Completed on {order.completedAt.substring(0,10)}
                </Message>
              ) : (
                <Message variant='primary'>In Progress</Message>
              )}
              {order.cancelled ? (
                <Message variant='danger'>Order Cancelled</Message>
              ) : (
                null
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h3>Payment Method</h3>
              <Row>
                <Col>
                    <p>
                        <strong>Type: </strong>
                        {order.paymentType}
                    </p>  
                </Col>
                {order.paymentMethod!=='null'?(
                  <Col>
                      <p>
                          <strong>Mode: </strong>
                          {order.paymentMethod}
                      </p>  
                  </Col>
                ):null}
              </Row>
              
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt.substring(0,10)}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h3>Order Items</h3>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        
                        <Col>
                            {item.name}
                        </Col>
                        <Col>
                            {item.category}
                        </Col>
                        <Col md={4}>
                          {item.qty} x ₹{item.cost} = ₹{item.qty * item.cost}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>Order Summary</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>₹{order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>₹{order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>₹{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              
              {(order.paymentType==='payLater' && order.paymentMethod==='null')?(
                <>
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
                                <h6>{eatery.upi}</h6>
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link2">
                                <h6>{eatery.paytm}</h6>
                                </Tab.Pane>
                            </Tab.Content>
                          </Col>
                        </Row>
                      </Tab.Container>
                  </ListGroup.Item>
                  
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={()=>paymentHandler(order)}
                      disabled={paymentMethod==='null' || order.cancelled}
                    >
                      Payment Done
                    </Button>
                  </ListGroup.Item>
                  {loadingPay && <Loader />}
                  {errorPay && <Message variant='danger'>{errorPay}</Message>}
                </>

                
              ):(null)}
              {/* {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )} */}
              {/* {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )} */}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderSummary
