import React from 'react'
import {Nav} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({step1,step2,step3}) => {
    return (
        <Nav className='justify-content-center mb-4'>
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to='/checkout'>
                        <Nav.Link>Checkout</Nav.Link>
                    </LinkContainer>
                ): (
                   <Nav.Link disabled>Checkout</Nav.Link>     
                )}
            </Nav.Item>
            <Nav.Item>
                {step2 ? (
                    <LinkContainer to='/payment'>
                        <Nav.Link>Payment</Nav.Link>
                    </LinkContainer>
                ): (
                   <Nav.Link disabled>Payment</Nav.Link>     
                )}
            </Nav.Item>
            <Nav.Item>
                {step3 ? (
                    <LinkContainer to='/orderSummary'>
                        <Nav.Link>Order</Nav.Link>
                    </LinkContainer>
                ): (
                   <Nav.Link disabled>Order</Nav.Link>     
                )}
            </Nav.Item>
        </Nav>
    )
}

export default CheckoutSteps
