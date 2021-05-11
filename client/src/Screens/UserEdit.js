import React, { useState, useEffect } from 'react';
import { Form, Button,Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import FormContainer from '../Components/FormContainer';
import { getUserDetails , updateUser } from '../actions/userActions';
import {USER_UPDATE_RESET} from '../constants/userConstants'

function UserEdit({ match, history }) {
    const userId = match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [userType, setUserType] = useState(2)
    const [eatery, setEatery] = useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector((state) => state.userUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate} = userUpdate

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin



    useEffect(() => {
        if(userInfo){
            if(successUpdate){
                dispatch({type: USER_UPDATE_RESET})
                history.push('/admin/userlist')
            }
            else{
                if(!user.name || user._id!==userId){
                    dispatch(getUserDetails(userId))
                }
                else{
                    setName(user.name)
                    setPhoneNumber(user.phoneNumber)
                    setEmail(user.email)
                    setUserType(user.userType)
                    setEatery(user.eatery)
                }
            }
        }
        else{
            history.push('/login')
        }
       
        
        
    }, [dispatch, history, userId, user, successUpdate, userInfo])

    const submitHandler = (e) => {

        e.preventDefault()
        dispatch(updateUser({
            _id: userId,
            name,
            email,
            phoneNumber,
            userType,
            eatery
        }))

    }

    return (
        <Container className='py-3'>
            
            <LinkContainer to='/admin/userlist'>
                <Button variant='secondary'>Back</Button>
            </LinkContainer>

            <FormContainer>
                <h2>Edit User</h2>
                { errorUpdate && <Message variant='danger'>{ errorUpdate }</Message>}
                { loadingUpdate && <Loader />}
                { error && <Message variant='danger'>{ error }</Message>}
                { loading && <Loader />}
                
                <Form onSubmit={submitHandler}>

                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='phoneNumber'>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter phone number'
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='userType'>
                        <Form.Label>UserType</Form.Label>
                        <Form.Control
                            as="select"
                            value={userType}
                            onChange={(e) => {
                                setUserType(Number(e.target.value))
                            }}
                        >
                       
                            <option value = '1'>Admin</option>
                            <option value = '2'>User</option>
                            <option value = '3'>Eatery</option>

                        </Form.Control>
                    </Form.Group>
                    {userType===3?(
                        
                        <Form.Group controlId='eatery'>
                            <Form.Label>Eatery ID</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter eatery ID'
                                value={eatery}
                                onChange={(e) => setEatery(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                    ):null}


                    <Button type='submit' variant='primary'>Update</Button>
                </Form>
            </FormContainer>
        </Container>
    );
}

export default UserEdit;