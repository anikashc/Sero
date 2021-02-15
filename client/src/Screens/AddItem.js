import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import FormContainer from '../Components/FormContainer';
import { register } from '../actions/userActions';

function AddItem({ location, history }) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector((state) => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {

        if (userInfo) {

            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {

        e.preventDefault()

        if (password !== confirmPassword) {

            setMessage('Passwords do not match')
        } else {

            dispatch(register(name, email, phoneNumber, password))
        }
    }

    return (
        <FormContainer>
            <h2>Add Item</h2>

            { message && <Message variant='danger'>{message}</Message>}
            { error && <Message variant='danger'>{error}</Message>}
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
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type='file'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='phoneNumber'>
                    <Form.Label>Discription</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter phone number'
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter confirm password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter confirm password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter confirm password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>Add</Button>
            </Form>
        </FormContainer>
    );
}

export default AddItem;