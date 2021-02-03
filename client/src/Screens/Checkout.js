import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Button, Card, Container, Form} from 'react-bootstrap'
import FormContainer from '../Components/FormContainer'
import {saveCustomerMeta} from '../actions/cartActions'


const Checkout = ({history}) => {
    const cart = useSelector(state=>state.cart)
    const dispatch = useDispatch()
    const {customerMeta}=cart
    const [name, setName] = useState(customerMeta.name);
    const [email, setEmail] = useState(customerMeta.email);
    const [phone, setPhone] = useState(customerMeta.phone);
    const [paymentMethod, setPaymentMethod] = useState(customerMeta.paymentMethod);
    const submitHandler =(e)=>{
        e.preventDefault()
        dispatch(saveCustomerMeta({name,email,phone,paymentMethod}))
        console.log('Done')
    }
    return (
        <FormContainer>
            <h1>Order</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Name'
                        value={name}
                        required
                        onChange={(e)=>setName(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='Email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Email (optional)'
                        value={email}
                        
                        onChange={(e)=>setEmail(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group> 
                <Form.Group controlId='phone'>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Phone'
                        value={phone}
                        required
                        onChange={(e)=>setPhone(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group> 
                
                <Button type='submit' variant='primary'>Continue</Button>  
            </Form>
        </FormContainer>
    )
}

export default Checkout
