import React, {useEffect } from 'react';
import { Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import {listUsers, deleteUser} from '../actions/userActions'

const UserList = ({ history }) => {
    const dispatch = useDispatch()

    const userList = useSelector((state) => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector((state) => state.userDelete)
    const { success: successDelete } = userDelete

    useEffect(() => {
        if (userInfo && userInfo.userType===1) {
            dispatch(listUsers())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, successDelete, userInfo])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteUser(id))
        }
    }
    return (
        <>
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
                        <th>EMAIL</th>
                        <th>PHONE</th>
                        <th>USER TYPE</th>
                        <th>EATERY</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>
                            <a href={`mailto:${user.email}`}>{user.email}</a>
                            </td>
                            <td>{user.phoneNumber}</td>
                            <td>
                            {user.userType===1 ? ('Admin') : (user.userType===2? ('User'):('Eatery Account'))}
                            </td>
                            <td>{user.eatery}</td>
                            <td>
                            <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                <Button variant='light' className='btn-sm'>
                                    <i className='fas fa-edit'></i>
                                </Button>
                            </LinkContainer>
                            <Button
                                variant='danger'
                                className='btn-sm'
                                onClick={() => deleteHandler(user._id)}
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

export default UserList