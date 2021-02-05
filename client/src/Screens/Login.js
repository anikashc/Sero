import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import FormContainer from '../Components/FormContainer';
import { login } from '../actions/userActions';

function Login ({location}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const submitHandler = (e) => {

        e.preventDefault()

        console.log("Submitted");
    }

    return (
        <FormContainer>
        <h1>Log In</h1>
        <Form onsubmit={submitHandler}>
            <Form.Group controlId='email'>
                <Form.label>Email Address</Form.label>
                <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>
        </Form>

        <Form onsubmit={submitHandler}>
            <Form.Group controlId='password'>
                <Form.label>Email Password</Form.label>
                <Form.Control
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Button type='submit' variants='primary'>
                Log In
            </Button>
        </Form>

        <Row className='py-3'>
            <Col>
                New Customer?{' '}
                <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                    Register
                </Link>
            </Col>
        </Row> 
    </FormContainer>
    );
}

export default Login;