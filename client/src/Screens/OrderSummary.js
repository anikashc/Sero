import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col,Button, Form} from 'react-bootstrap'
import {saveCustomerMeta} from '../actions/cartActions'
import FormContainer from '../Components/FormContainer'
import CheckoutSteps from '../Components/CheckoutSteps'


const OrderSummary = ({history}) => {
    const cart = useSelector(state=>state.cart)
    const {customerMeta}=cart
    
    
    if(!customerMeta){
        history.push('/checkout');
    }
    
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <h2>Order Summary</h2>
            
        </FormContainer>
    )
}

export default OrderSummary


