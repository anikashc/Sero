import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import CurrentOrders from '../Components/CurrentOrders';
import {getUserDetails, updateUserProfile} from '../actions/userActions'
import {listEateryDetails} from '../actions/eateryActions'


const Dashboard = ({history}) => {

    // for all update work
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    //const [ownedEatery, setOwnedEatery] = useState({})


    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails 
    
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin 
    const dispatch = useDispatch()

    const  eateryDetails = useSelector(state => state.eateryDetails) 
    const {loading:loadingEatery, error: errorEatery, eatery} = eateryDetails

    const  userUpdateProfile = useSelector(state => state.userUpdateProfile) 
    const {success, loading:updateLoading} = userUpdateProfile
    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
        else{
            if(!user.name || user.name!==userInfo.name){
                dispatch(getUserDetails('profile'))
            }
            else{
                setName(user.name)
                setEmail(user.email)
                setPhoneNumber(user.phoneNumber)
                dispatch(listEateryDetails(user.eatery))  
            }
        }
    }, [dispatch, history, userInfo, user,success])

    const submitHandler = (e) => {

        e.preventDefault()

        if(password !== confirmPassword) {

            setMessage('Passwords do not match')
        } else {
            // update profile
            dispatch(updateUserProfile({id:user._id, name, email, phoneNumber, password}))
            
           
        }

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
                                {userInfo?(
                                    <Link to={{
                                        pathname: '/dashboardMenu',
                                        state: {
                                            eateryMenu: eatery.menu
                                        }
                                    }}>
                                        <Card style={{ height: '6rem', width: '10rem' }}>
                                            <Card.Body>
                                                <Card.Title> Menu </Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                ):(
                                    null
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
                                <Link to='/orders'>
                                    <Card style={{ height: '6rem', width: '10rem' }}>
                                        <Card.Body>
                                            <Card.Title> Past Orders </Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col>
                        </Row>
                        <Container>
                            <CurrentOrders className='py-3'/>
                        </Container>
                    </Container>
                </Col>
                
            </Row>
        </>
    );
}

export default Dashboard;