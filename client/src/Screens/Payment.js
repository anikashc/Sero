import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Button, Card, Container, Form} from 'react-bootstrap'
import {saveCustomerMeta} from '../actions/cartActions'
import FormContainer from '../Components/FormContainer'
import CheckoutSteps from '../Components/CheckoutSteps'

const Payment = ({history}) => {
    const cart = useSelector(state=>state.cart)
    const dispatch = useDispatch()
    const {eateryDetails, customerMeta}=cart
    
    
    if(!customerMeta){
        history.push('/checkout');
    }
    
    return (
        <h1>payment</h1>
    )
}

export default Payment
 