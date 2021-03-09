import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col,Button, Form} from 'react-bootstrap'
import {saveCustomerMeta} from '../actions/cartActions'
import FormContainer from '../Components/FormContainer'
import CheckoutSteps from '../Components/CheckoutSteps'
import {
    listEateryDetails
  } from '../actions/eateryActions'

const Checkout = ({history}) => {
    const cart = useSelector(state=>state.cart)
    const dispatch = useDispatch()
    const {eateryDetails, customerMeta}=cart

    const eateryDetailsFetched = useSelector((state) => state.eateryDetails)
    const {eatery} = eateryDetailsFetched

    const [name, setName] = useState(customerMeta.name);
    const [email, setEmail] = useState(customerMeta.email);
    const [phone, setPhone] = useState(customerMeta.phone);
    const [paymentType, setPaymentType] = useState('Pay Now');

    useEffect(() => {
        dispatch(listEateryDetails(eateryDetails._id))
    }, [])
    const submitHandler =(e)=>{
        e.preventDefault()
        dispatch(saveCustomerMeta({name,email,phone,paymentType}))

        console.log(paymentType)

        // if(paymentType=='payLater'){
        //     history.push('/orderSummary')
        // }
        // else{
            history.push('/payment')
        //}
        
    }
    return (
        <FormContainer>
            <CheckoutSteps step1/>
            <h2>Checkout</h2>
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
                        type='email'
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
                
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                
                    <Col>
                    
                        <Form.Check
                            type='radio'
                            label='Pay Now'
                            id='Pay Now'
                            name='paymentType'
                            value='payNow'
                            disabled={!eatery.payNowEnable}
                            required
                            onChange={(e)=>setPaymentType(e.target.value)}
                        >
                        </Form.Check>
                        <Form.Check
                            type='radio'
                            label='Pay Later'
                            id='Pay Later'
                            name='paymentType'
                            value='payLater'
                            disabled={!eatery.payLaterEnable}
                            onChange={(e)=>setPaymentType(e.target.value)}
                        >
                        </Form.Check>
                    </Col>
                </Form.Group>
                    
                
                
                <Button type='submit' variant='primary'>Continue</Button>  
            </Form>
        </FormContainer>
    )
}

export default Checkout
