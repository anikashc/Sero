import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import FormContainer from '../Components/FormContainer';
import { login } from '../actions/userActions';

const Login= ({location, history})=>{

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const redirect = location.search?location.search.split("=")[1]:'/'

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    },[history,userInfo, redirect])
    
    const submitHandler = (e) => {

        e.preventDefault()

        dispatch(login(email, password))
    }

    return (
        <FormContainer>
        <h2>Login</h2>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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

            <Button type='submit' variants='primary'>Login</Button>
        </Form>

        <Row className='py-3'>
            <Col>
                Want to join us? 
                <Link to={redirect ? `/register?redirect=${redirect}`:'/register'}>
                <i class="fas fa-user-plus pl-3 pr-1"></i>Register
                </Link>
            </Col>
        </Row>
    </FormContainer>
    );
}

export default Login;