import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Form, Button,Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import FormContainer from '../Components/FormContainer';
import { listEateryDetails, updateEatery } from '../actions/eateryActions';
import {EATERY_UPDATE_RESET} from '../constants/eateryConstants'

function EateryEdit({ match, history }) {
    
    const eateryId = match.params.id
    
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [rating, setRating] = useState(0)
    const [payNowEnable, setPayNowEnable] = useState(false)
    const [payLaterEnable, setPayLaterEnable] = useState(false)
    const [numReviews, setNumReviews] = useState(0)
    const [active, setActive] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const eateryDetails = useSelector((state) => state.eateryDetails)
    const { loading, error, eatery } = eateryDetails

    console.log(eatery)

    const eateryUpdate = useSelector((state) => state.eateryUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate} = eateryUpdate

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin


    useEffect(() => {
        if(userInfo){
            if(successUpdate){
                dispatch({type: EATERY_UPDATE_RESET})
                if(userInfo.userType===1){
                    history.push('/admin/eaterylist')
                }
                else{
                    history.push('/dashboard')
                }
            }
            else{
                if (!eatery.name || eatery._id!==eateryId){
                    dispatch(listEateryDetails(eateryId))
                }
                else{
                    setName(eatery.name)
                    setAddress(eatery.address)
                    setCategory(eatery.category)
                    setImage(eatery.image)
                    setDescription(eatery.description)
                    setRating(eatery.rating)
                    setPayLaterEnable(eatery.payLaterEnable)
                    setPayNowEnable(eatery.payNowEnable)
                    setIsOpen(eatery.isOpen)
                    setActive(eatery.active)
                    setNumReviews(eatery.numReviews)
                }
            }
        }
        else{
            history.push('/login')
        }
        
    }, [dispatch, history, eateryId, eatery, userInfo, successUpdate, image])

    const uploadFileHandler = async () => {

        const file = document.getElementById('image');
        const formData = new FormData()
        formData.append('image', file)

        setUploading(true)

        try {

            const { data } = await axios.post('/api/upload', formData)
            
            setImage(data)
            setUploading(true)

        } catch (error) {

            console.error(error)
            setUploading(false)
        }
    }

    const submitHandler = (e) => {

        e.preventDefault()
        console.log('happening')
        dispatch(updateEatery({
            _id: eateryId,
            name,
            address,
            image,
            category,
            description, 
            rating,
            payNowEnable,
            payLaterEnable, 
            numReviews,
            active,
            isOpen
        }))

    }

    return (
        <Container className='py-3'>
            
            {userInfo.userType===1?(
                <LinkContainer to='/admin/eaterylist'>
                    <Button variant='secondary'>Back</Button>
                </LinkContainer>
            ):(
                <LinkContainer to='/dashboard'>
                    <Button variant='secondary'>Back</Button>
                </LinkContainer>
            )}

            <FormContainer>
                <h2>Edit Eatery</h2>
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

                    <Form.Group controlId='address'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter Address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='image'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter Image URL'
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        ></Form.Control>
                        
                        <input type="file" id="image"></input>
                        <Button onClick={uploadFileHandler}>Upload</Button>
                        
                        {uploading && <Loader />}
                    </Form.Group>
                    

                    <Form.Group controlId='category'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            as="select"
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value)
                            }}
                        >
                            <option value = 'Cafe'>Cafe</option>
                            <option value = 'Buffet'>Buffet</option>
                            <option value = 'Bar'>Bar</option>
                            <option value = 'Dining'>Dining</option>
                            <option value = 'Bakery'>Bakery</option>
                            <option value = 'Fast Food'>Fast Food</option>
                        </Form.Control>
                    </Form.Group>

                    {/* only admin can change the rating by hardcoding */}
    
                    <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Rating'
                            value={rating}
                            disabled={userInfo.userType!==1}
                            onChange={(e) => setRating(e.target.value)}
                        ></Form.Control>
                    </Form.Group>   
                    <Form.Group controlId='numReviews'>
                        <Form.Label>Number of Reviews</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Rating'
                            value={numReviews}
                            disabled={userInfo.userType!==1}
                            onChange={(e) => setNumReviews(e.target.value)}
                        ></Form.Control>
                    </Form.Group> 

                    <Form.Group controlId='isOpen'>
                        <Form.Label>Operational Status</Form.Label>
                        <Form.Control
                            as="select"
                            value={isOpen}
                            onChange={(e) => {
                                setIsOpen(e.target.value)
                            }}
                        >
                       
                            <option value = 'true'>Open</option>
                            <option value = 'false'>Closed</option>

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='payNowEnable'>
                        <Form.Label>Pay Now</Form.Label>
                        <Form.Control
                            as="select"
                            value={payNowEnable}
                            onChange={(e) => {
                                setPayNowEnable(e.target.value)
                            }}
                        >
                       
                            <option value = 'true'>Enable</option>
                            <option value = 'false'>Disable</option>

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='payLaterEnable'>
                        <Form.Label>Pay Later</Form.Label>
                        <Form.Control
                            as="select"
                            value={payLaterEnable}
                            onChange={(e) => {
                                setPayLaterEnable(e.target.value)
                            }}
                        >
                       
                            <option value = 'true'>Enable</option>
                            <option value = 'false'>Disable</option>

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='active'>
                        <Form.Label>Active Status</Form.Label>
                        <Form.Control
                            as="select"
                            value={active}
                            disabled={userInfo.userType!==1}
                            onChange={(e) => {
                                setActive(e.target.value)
                            }}
                        >
                       
                            <option value = 'true'>Active</option>
                            <option value = 'false'>Inactive</option>

                        </Form.Control>
                    </Form.Group>
                    
                    <Button type='submit' variant='primary'>Update</Button>
                </Form>
            </FormContainer>
        </Container>
    );
}

export default EateryEdit;