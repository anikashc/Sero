import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Button, ButtonGroup, Form, Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../actions/userActions';
import { listEateryDetails, updateEatery } from '../actions/eateryActions';

const DashboardMenu = ({history}) => {

    const [addItemButton, setAddItemButton] = useState(0);

    const addItemButtonHandler = () => {

        setAddItemButton((addItemButton + 1) % 2);
    }
    
    const [name, setName] = useState('');
    const [cost, setCost] = useState(0);
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [isAvailable, setIsAvailable] = useState(true);

    const eateryDetails = useSelector(state => state.eateryDetails);
    const { eatery } = eateryDetails;

    const userDetails = useSelector((state) => state.userDetails);
    const { user } = userDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const eateryMenu = eatery.menu;

    const dispatch = useDispatch();

    const deleteMenu = ID => () => {

        let menu = eateryMenu.filter(menu => menu._id !== ID);
        
        dispatch(updateEatery({ _id: eatery._id, menu }));
    }

    useEffect(() => {

        if (!userInfo) {

            history.push('/login');
        }
        else {
            if (!user.name || user.name !== userInfo.name) {

                dispatch(getUserDetails('profile'));
            }
            else {

                dispatch(listEateryDetails(user.eatery));
            }
        }

    }, [dispatch, history, user, userInfo]);

    const submitHandler = (e) => {

        e.preventDefault();

        let menu = [...eateryMenu, {

            name,
            cost,
            category,
            description,
            image,
            isAvailable
        }];

        console.log(menu);

        dispatch(updateEatery({ _id: eatery._id, menu }));

        setAddItemButton((addItemButton + 1) % 2);
    }

    return (
        <>
            <Container className='py-3'>
                {userInfo.userType === 1?(
                    <LinkContainer to='/admin/eaterylist'>
                        <Button variant='secondary'>Back</Button>
                    </LinkContainer>
                ):(
                    <LinkContainer to='/dashboard'>
                        <Button variant='secondary'>Back</Button>
                    </LinkContainer>
                )}
                
                <h1>Menu</h1>
                <Button onClick={addItemButtonHandler}>Add Item</Button>
            </Container>

            {addItemButton === 1 && (
                <Container className='py-3'>
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

                    <Form.Group controlId='cost'>
                        <Form.Label>Cost</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter cost'
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='category'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter category'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='image'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Upload Image'
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
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

                    <Form.Group controlId='isAvailable'>
                        <Form.Label>Availiablity</Form.Label>
                        <Form.Control
                            type='checkbox'
                            value={isAvailable}
                            onChange={(e) => setIsAvailable(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'>Add Item</Button>
                </Form>
            </Container>)}

            <Container className='py-3'>
                <Row>
                    {eateryMenu.map((item =>
                        <Col className='py-3'>
                            <Row>
                                <Card style={{ height: '15rem', width: '50rem' }}>
                                    <Card.Img variant="top" src={item.image}
                                        style={{width: '5rem', height: '5rem' }}
                                    />
                                    <Card.Body>
                                        <Card.Title> {item.name} </Card.Title>
                                        <Card.Text>
                                            {item.description}
                                        </Card.Text>
                                        <h6>{item.isAvailable ? 'Available' : 'Not available'}</h6>
                                        <ButtonGroup>
                                            <Col>
                                                <Button variant='warning'>Edit</Button>
                                            </Col>
                                            <Col>
                                                <Button onClick={deleteMenu(item._id)} variant='warning'>Delete</Button>
                                            </Col>
                                        </ButtonGroup>
                                    </Card.Body>
                                </Card>
                            </Row>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}

export default DashboardMenu;