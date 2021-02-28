import React, {useState } from 'react';
import { Table, Button,ListGroup } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';


const CurrentOrders = ({orders}) => {
    
    
    return (
        <div>
            <h2>Current Orders</h2>
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                    <th>STATUS</th>
                    <th>NAME</th>
                    <th>PHONE</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
            
                    <th>MODE</th>
                    <th>COMPLETE</th>
                    <th>INFO</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        !order.completed?(
                            <tr key={order._id}>
                            <td>{order.paymentType==="payNow"?(order.isPaid?<i class="fas fa-check-circle"></i>:<Button className='btn-sm'>Paid</Button>):('Paid')}</td>
                            <td>{order.customerMeta.name}</td>
                            <td>{order.customerMeta.phone}</td>
                            <td>{order.createdAt.substring(0,10)}</td>
                            <td>₹{order.totalPrice}</td>
                            
                            <td>{order.paymentMethod}</td>
                            <td><Button className='btn-sm' variant='success'>Complete</Button></td> 
                            <td><LinkContainer to={`/orderSummary/${order._id}`}>
                            <Button className='btn-sm' variant='light'><i class="fas fa-info-circle"></i></Button>
                                </LinkContainer>
                            </td> 
                            <td><Button className='btn-sm' variant='danger'>Cancel</Button></td> 
                        </tr>
                        ):(null)
                    
                    ))}
                </tbody>
            </Table>
        </div>
        
        
    );
}

export default CurrentOrders;