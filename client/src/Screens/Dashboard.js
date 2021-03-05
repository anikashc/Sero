import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container, Card, Form, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listEateryDetails} from '../actions/eateryActions'
import io from 'socket.io-client'
import { payOrder, completeOrder, cancelOrder, listMyOrders} from '../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_COMPLETED_RESET, ORDER_CANCEL_RESET } from '../constants/orderConstants';
import { LinkContainer } from 'react-router-bootstrap';


let socket

const Dashboard = ({history}) => {

    // for all update work
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    


    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails 
    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const eateryDetails = useSelector(state => state.eateryDetails) 
    const {loading:loadingEatery, error: errorEatery} = eateryDetails


    const  userUpdateProfile = useSelector(state => state.userUpdateProfile) 
    const { success, loading: updateLoading } = userUpdateProfile

    const  orderListMy = useSelector(state => state.orderListMy) 
    const { loading: loadingOrders, error: errorOrders, orders  } = orderListMy
    
    const ENDPOINT ='localhost:5000'

    const orderPay = useSelector((state) => state.orderPay)
    const { order: orderPaid, loading: loadingPay, success: successPay, error: errorPay } = orderPay

    const orderComplete = useSelector((state) => state.orderComplete)
    const { order: orderCompleted, loading: loadingComplete, success: successComplete, error: errorComplete } = orderComplete

    const orderCancel = useSelector((state) => state.orderCancel)
    const { order: orderCancelled, loading: loadingCancel, success: successCancel, error: errorCancel } = orderCancel

    useEffect(() => {
        socket =io.connect(ENDPOINT, {reconnect: true})
        if (!userInfo) {
            history.push('/login')
        }
        else{
            if(!user.name || user.name!==userInfo.name){
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            }
            else{
                setName(user.name)
                setEmail(user.email)
                setPhoneNumber(user.phoneNumber)
                dispatch(listEateryDetails(user.eatery))  
            }
        }
        if(successPay){
            const orderPaidId=orderPaid._id
            socket.emit('paid', {orderPaidId})
            dispatch(listMyOrders())
            dispatch({ type: ORDER_PAY_RESET })  
        }
        else if(successCancel){
            const orderCancelledId=orderCancelled._id
            socket.emit('cancelled', {orderCancelledId})
            dispatch(listMyOrders())
            dispatch({ type: ORDER_CANCEL_RESET })
        }
        else if(successComplete){
            const orderCompletedId=orderCompleted._id
            socket.emit('completed', {orderCompletedId})
            dispatch(listMyOrders())
            dispatch({ type: ORDER_COMPLETED_RESET })
        }
        socket.on('customerPaidOrder', ({eateryIdforSocket})=>{
            if(eateryIdforSocket===userInfo.eatery){
              dispatch(listMyOrders())
            }
        }) 
        socket.on('refreshOrders', ()=>{
              dispatch(listMyOrders())
        }) 
        return () => {
            //socket.emit('disconnect')
            socket.off()
        }
    }, [dispatch, history, userInfo, user, success, ENDPOINT, successPay, successComplete, successCancel])

    const submitHandler = (e) => {

        e.preventDefault()

        if(password !== confirmPassword) {

            setMessage('Passwords do not match')
        } else {
            // update profile
            dispatch(updateUserProfile({id:user._id, name, email, phoneNumber, password}))
        }

    }

    const payHandler = (order) =>{
        dispatch(payOrder(order))
    }

    const cancelHandler = (order) =>{
        dispatch(cancelOrder(order))
    }

    const completeHandler = (order) =>{
        dispatch(completeOrder(order))
    }

    return (
        <>
            <Row><h1>Dashboard</h1></Row>
            <Row>
                <Col md={3}>
                    { message && <Message variant='danger'>{ message }</Message>}
                    { error && <Message variant='danger'>{ error }</Message>}
                    { success && <Message variant='success'>Successfully Updated</Message>}
                    { loading && <Loader />}
                    { updateLoading && <Loader />}
                    <Form onSubmit={submitHandler}>

                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='phoneNumber'>
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter phone number'
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Enter password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='confirmPassword'>
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Enter confirm password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary'>Update</Button>
                    </Form>
                </Col>
                <Col md={9}>
                    <Container className='py-3'>
                        { errorEatery && <Message variant='danger'>{ errorEatery }</Message>}
                        { loadingEatery && <Loader />}
                        <Row>
                            <Col>
                                {userInfo && (
                                    <Link to='/dashboardMenu'>
                                        <Card style={{ height: '6rem', width: '10rem' }}>
                                            <Card.Body>
                                                <Card.Title> Menu </Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                )}  
                            </Col>
                        
                            <Col>
                                <Link to='/feedback'>
                                    <Card style={{ height: '6rem', width: '10rem' }}>
                                        <Card.Body>
                                            <Card.Title> Feedback </Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col>

                            <Col>
                                <Link to='/myorders'>
                                    <Card style={{ height: '6rem', width: '10rem' }}>
                                        <Card.Body>
                                            <Card.Title> Past Orders </Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col>

                            <Col>
                                <Link to={{ pathname: `/admin/eatery/${user.eatery}/edit`}}>
                                    <Card style={{ height: '6rem', width: '10rem' }}>
                                        <Card.Body>
                                            <Card.Title> Manage Eatery </Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col>
                        </Row>
                        <Container>
                            {loadingOrders? <Loader /> : errorOrders? <Message variant='danger'>{errorOrders}</Message>:(
                                <div>
                                    <h2>Current Orders</h2>
                                    { (loadingPay || loadingCancel || loadingComplete) && <Loader />}
                                    { errorPay && <Message variant='danger'>{ errorPay }</Message>}
                                    <Table striped bordered hover responsive className='table-sm'>
                                        <thead>
                                            <tr>
                                            <th>STATUS</th>
                                            <th>NAME</th>
                                            <th>PHONE</th>
                                            <th>DATE</th>
                                            <th>TOTAL</th>
                                    
                                            <th>MODE</th>
                                            <th>COMPLETE</th>
                                            <th>INFO</th>
                                            <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map((order) => (
                                                !order.completed?(
                                                    <tr key={order._id}>
                                                    <td>{order.paymentType==="payNow"?(
                                                        order.isPaid?<i class="fas fa-check-circle"></i>
                                                        :<Button className='btn-sm' onClick={()=>payHandler(order)}>Paid</Button>
                                                    ):
                                                        (order.paymentMethod!=='null'?(
                                                            order.isPaid?<i class="fas fa-check-circle"></i>
                                                            :<Button className='btn-sm' onClick={()=>payHandler(order)}>Paid</Button> 
                                                        ):(
                                                            'Progress'
                                                        ))}</td>
                                                    {/* <td><Button className='btn-sm' onClick={()=>payHandler(order)}>Paid</Button></td> */}
                                                    <td>{order.customerMeta.name}</td>
                                                    <td>{order.customerMeta.phone}</td>
                                                    <td>{order.createdAt.substring(0,10)}</td>
                                                    <td>₹{order.totalPrice}</td>
                                                    
                                                    <td>{order.paymentMethod}</td>
                                                    <td>{order.completed?'Completed':(<Button className='btn-sm' variant='success' disabled={!order.isPaid} onClick={()=>completeHandler(order)}>Complete</Button>)}</td> 
                                                    <td><LinkContainer to={`/orderSummary/${order._id}`}>
                                                    <Button className='btn-sm' variant='light'><i class="fas fa-info-circle"></i></Button>
                                                        </LinkContainer>
                                                    </td> 
                                                    <td>{order.cancelled?'Cancelled':(<Button className='btn-sm' variant='danger' disabled={order.isPaid} onClick={()=>cancelHandler(order)}>Cancel</Button>)}</td> 
                                                </tr>
                                                ):(null)
                                            
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            )}
                            
                        </Container>
                    </Container>
                </Col>
                
            </Row>
        </>
    );
}

export default Dashboard;