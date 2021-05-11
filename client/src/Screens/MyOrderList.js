import React, {useEffect } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import {listMyOrders} from '../actions/orderActions'

const MyOrderList = ({ history, match }) => {
    const dispatch = useDispatch()


    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const  orderListMy = useSelector(state => state.orderListMy) 
    const { loading, error, orders  } = orderListMy


    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
        else{
            dispatch(listMyOrders())
        }
    }, [])


    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h2>Past Orders</h2>
                </Col>
            </Row>

            {loading ? (
                <Loader /> )
            : error ? (
                <Message variant='danger'>{error}</Message>) 
            : (
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

                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            
                                <tr key={order._id}>
                                <td>{order.isPaid?<i class="fas fa-check-circle"></i>:'Unpaid'}</td>
                                <td>{order.customerMeta.name}</td>
                                <td>{order.customerMeta.phone}</td>
                                <td>{order.createdAt.substring(0,10)}</td>
                                <td>₹{order.totalPrice}</td>
                                
                                <td>{order.paymentMethod}</td>
                                <td>{order.cancelled?('Cancelled'):('Completed')}</td> 
                                <td><LinkContainer to={`/orderSummary/${order._id}`}>
                                <Button className='btn-sm' variant='light'><i class="fas fa-info-circle"></i></Button>
                                    </LinkContainer>
                                </td> 
                                {/* <td><Button className='btn-sm' variant='danger' onClick={cancelHandler(order)}>Cancel</Button></td>  */}
                            </tr>
                         
                        
                        ))}
                    </tbody>
                </Table>
            )}  
        </>
    )
}

export default MyOrderList