import React, {useEffect } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import {} from '../actions/orderActions'

const OrderList = ({ history, match }) => {
    const dispatch = useDispatch()

    const eateryList = useSelector((state) => state.eateryList)
    const { loading, error, eateries } = eateryList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin


    useEffect(() => {
        
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
                        <th>ID</th>
                        <th>NAME</th>
                        <th>ADDRESS</th>
                        <th>CATEGORY</th>
                        <th>MENU</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {eateries.map((eatery) => (
                        <tr key={eatery._id}>
                            <td>{eatery._id}</td>
                            <td>{eatery.name}</td>
                            <td>{eatery.address}</td>
                            <td>{eatery.category}</td>
                            <td>
                            <Link to={{
                                pathname: '/dashboardMenu',
                                state: {
                                    eateryMenu: eatery.menu,
                                    eateryId: eatery._id
                                }
                            }}>
                                Menu
                            </Link>
                            </td>
                            <td>
                            <LinkContainer to={`/admin/eatery/${eatery._id}/edit`}>
                                <Button variant='light' className='btn-sm mr-3'>
                                    <i className='fas fa-edit'></i>
                                </Button>
                            </LinkContainer>
                            
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
            )}  
        </>
    )
}

export default OrderList