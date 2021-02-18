import React, { useState, useEffect } from 'react';
import { Form, Button,Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import FormContainer from '../Components/FormContainer';
import { register } from '../actions/userActions';

function UpdateDetails({ history }) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()
    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    useEffect(() => {

    }, [history, user])

    const submitHandler = (e) => {

        e.preventDefault()

        if(password !== confirmPassword) {

            setMessage('Passwords do not match')
        } else {

            dispatch(register(name, email, phoneNumber, password))
        }
    }

    return (
        <Container className='py-3'>
            
            <LinkContainer to='/profile'>
                <Button variant='secondary'>Back</Button>
            </LinkContainer>

            <FormContainer>
                <h2>Update Details</h2>

                { message && <Message variant='danger'>{ message }</Message>}
                { error && <Message variant='danger'>{ error }</Message>}
                { loading && <Loader />}
                
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
            </FormContainer>
        </Container>
    );
}

export default UpdateDetails;