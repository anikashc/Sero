import React, {useEffect } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import {listEateries, deleteEatery, createEatery} from '../actions/eateryActions'
import {EATERY_CREATE_RESET} from '../constants/eateryConstants'

const EateryList = ({ history, match }) => {
    const dispatch = useDispatch()

    const eateryList = useSelector((state) => state.eateryList)
    const { loading, error, eateries } = eateryList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const eateryDelete = useSelector((state) => state.eateryDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = eateryDelete

    const eateryCreate = useSelector((state) => state.eateryCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, eatery: createdEatery } = eateryCreate
    

    useEffect(() => {
        dispatch({type: EATERY_CREATE_RESET})
        if (userInfo.userType!==1) {
            history.push('/login')
        }
        if(successCreate){
            history.push(`/admin/eatery/${createdEatery._id}/edit`)
        } else{
            dispatch(listEateries())
        }
    }, [dispatch, history, userInfo, successCreate, successDelete, createdEatery])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteEatery(id))
        }
    }
    const createEateryHandler = () => {
        dispatch(createEatery())
    }
    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h2>Eateries</h2>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createEateryHandler}>
                        <i className='fas fa-plus'></i> Create Eatery
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
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
                            <Button
                                variant='danger'
                                className='btn-sm'
                                onClick={() => deleteHandler(eatery._id)}
                            >
                                <i className='fas fa-trash'></i>
                            </Button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
            )}  
        </>
    )
}

export default EateryList