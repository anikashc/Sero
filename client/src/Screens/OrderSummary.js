import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup,Card, Button,Tab, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import {
  getOrderDetails,
  paymentDone,
} from '../actions/orderActions'
import {
  listEateryDetails,
  createEateryReview
} from '../actions/eateryActions'
import { ORDER_PAYMENT_DONE_RESET } from '../constants/orderConstants'
import { CART_RESET, CART_EDIT_ORDER_RESET } from '../constants/cartConstants'
import {EATERY_CREATE_REVIEW_RESET} from '../constants/eateryConstants'



let socket
const OrderSummary = ({ match, history, location}) => {
  const orderId = match.params.id
  //const [eateryID, setEateryID] = useState('')
  //const [name, setName] = useState('')
  //const [email, setEmail] = useState('')
  //const [reviewDone, setReviewDone] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const eateryCreateReview = useSelector(state => state.eateryCreateReview)
  const {success: successEateryReview, error: errorEateryReview} = eateryCreateReview

  const eateryDetails = useSelector((state) => state.eateryDetails)
  const {loading:eateryLoading, error: eateryError, eatery} = eateryDetails

  const [paymentMethod, setPaymentMethod] = useState('null')

  let redirect = location.search? location.search.split('=')[1]:null

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
    //setEateryID(order.eatery)
    // setName(order.customerMeta.name)
    // setEmail(order.customerMeta.email)
  }

  // const email = order.customerMeta.email;
  // const name = order.customerMeta.name;
  const ENDPOINT ='localhost:5000'

  useEffect(() => {
    socket =io.connect(ENDPOINT, {reconnect: true})
    
    if (!order  || order._id !== orderId) {
      dispatch(getOrderDetails(orderId))
    }  
    else if(!eatery){
      dispatch(listEateryDetails(order.eatery))
    }
    else if(redirect){
      dispatch(getOrderDetails(orderId))
      history.push(`/orderSummary/${orderId}`)
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
    
    if(successEateryReview){
      alert("Review Submitted")
      setRating(0)
      setComment('')
      dispatch({type: EATERY_CREATE_REVIEW_RESET})
      dispatch(getOrderDetails(orderId))
  }

    return () => {
      //socket.emit('disconnect')
      socket.off()
    }
    
  }, [dispatch, orderId, order, ENDPOINT,eatery,successPay, successEateryReview,redirect])

const reviewSubmitHandler = (e) => {
  e.preventDefault()
  dispatch(createEateryReview(order.eatery, {
      name: order.customerMeta.name,
      email: order.customerMeta.email,
      phoneNumber: order.customerMeta.phone,
      rating,
      comment,
      orderId
  }))
}

  const paymentHandler = () =>{
    dispatch(paymentDone({
        _id: orderId,
        paymentMethod: paymentMethod
    }
    ))
  }

  const addItemsHandler = () =>{
    dispatch({type: CART_EDIT_ORDER_RESET})
    history.push(`/menu/${order.eatery}?redirect=${orderId}`)
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
                  {order.paymentType==='payLater' && order.paymentMethod==='null'?(
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={addItemsHandler}
                    >
                      Add Items
                    </Button>
                  ):
                  null}
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
                    Select Payment Method
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
              {order.completed && (
                <ListGroup.Item>
                  {errorEateryReview && (
                    <Message variant='danger'>{errorEateryReview}</Message>
                  )}
                  {(successEateryReview || order.isReviewed) ? <Message variant='success'>Feedback Submitted</Message> : (
                    <Form onSubmit={reviewSubmitHandler}>
                    <Form.Group controlId='rating'>
                      <Form.Label>Rating</Form.Label>
                      <Form.Control as='select' value={rating} 
                       onChange={(e) => setRating(e.target.value)}>
                        <option value=''>Select....</option>
                        <option value='1'>1 - Poor</option>
                        <option value='2'>2 - Fair</option>
                        <option value='3'>3 - Good</option>
                        <option value='4'>4 - Very Good</option>
                        <option value='5'>5 - Excellent</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='comment'>
                      <Form.Label>Comment</Form.Label>
                      <Form.Control as='textarea' rows='3' value={comment} 
                       onChange={(e) => setComment(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary'>Submit</Button>
                  </Form>
                  )}
                  
                </ListGroup.Item>
              )}
              
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderSummary
