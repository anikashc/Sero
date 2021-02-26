import React from 'react'

import {useSelector } from 'react-redux'


const Payment = ({history}) => {
    const cart = useSelector(state=>state.cart)
    const {customerMeta}=cart
    
    
    if(!customerMeta){
        history.push('/checkout');
    }
    
    return (
        <h1>payment</h1>
    )
}

export default Payment
 