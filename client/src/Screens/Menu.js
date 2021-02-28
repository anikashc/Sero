import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { Row, Col, Image, ListGroup, Form, Button} from 'react-bootstrap'

import { listEateryDetails, createEateryReview} from '../actions/eateryActions'
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import StarRatings from 'react-star-ratings';

import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import {EATERY_CREATE_REVIEW_RESET} from '../constants/eateryConstants'

import Category from '../Components/Category';

//import axios from 'axios'
const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 1080,
      backgroundColor: 'black',
     
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }));

function groupBy(objectArray, property) {
    return objectArray.reduce((acc, obj) => {
       const key = obj[property];
       if (!acc[key]) {
          acc[key] = [];
       }
       // Add object to list for given key's value
       acc[key].push(obj);
       return acc;
    }, {});
 }

const Menu = ({match}) => {
    // match.params.id or match.params. anything that is in the url
    //const eatery = eateries.find(p=>p._id===match.params.id)
    //const [eatery,setEatery] = useState({})
    const [rating, setRating] = useState(0)
    const [name, setName] = useState('')
    const [comment, setComment] = useState('')
    const [email, setEmail] = useState('')

    const dispatch = useDispatch()

    const  eateryDetails = useSelector(state => state.eateryDetails) // call whatever you call in the store
    const {loading, error, eatery} = eateryDetails

    const eateryCreateReview = useSelector(state => state.eateryCreateReview)
    const {success: successEateryReview, error: errorEateryReview} = eateryCreateReview

    useEffect(()=>{
          dispatch(listEateryDetails(match.params.id))
          if(successEateryReview){
              alert("Review Submitted")
              setRating(0)
              setName('')
              setComment('')
              setEmail('')
              dispatch({type: EATERY_CREATE_REVIEW_RESET})
          }
    },[dispatch, match, successEateryReview])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createEateryReview(match.params.id, {
            name,
            email,
            rating,
            comment
        }))
    }

    const classes = useStyles();
    return (
        <div>
            <Link className="btn btn-secondary my-3" to="/">Go Back</Link>
            {loading? (
                <Loader /> 
                )
            :   error ?(
                <Message variant='danger'>{error}</Message>
                ) 
            :   (
                <>
                    <Row>
                        <Col md={6}>
                            <Image src={eatery.image} alt={eatery.name } fluid />
                        </Col>
                        <Col md={6}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                <h3>{eatery.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                Description: {eatery.description}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                <StarRatings
                                    rating={eatery.rating}
                                    starRatedColor="#FFDF00"
                                    starEmptyColor="#585858"
                                    starDimension="2rem"
                                    starSpacing="5px"
                                />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {errorEateryReview && (
                                        <Message variant='danger'>{errorEateryReview}</Message>
                                    )}
                                    <Form onSubmit={submitHandler}>
                                        <Form.Group controlId='name'>
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type='text' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId='email'>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type='text' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId='rating'>
                                            <Form.Label>Rating</Form.Label>
                                            <Form.Control as='select' value={rating} 
                                            onChange={(e) => setRating(e.target.value)}>
                                                <option value=''>Select....</option>
                                                <option value='1'>1 - Poor</option>
                                                <option value='2'>2 - Fair</option>
                                                <option value='3'>3 - Good</option>
                                                <option value='4'>4 - Very Good</option>
                                                <option value='5'>5 - Excellent</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId='comment'>
                                            <Form.Label>Comment</Form.Label>
                                            <Form.Control as='textarea' rows='3' value={comment} 
                                            onChange={(e) => setComment(e.target.value)}></Form.Control>
                                        </Form.Group>
                                        <Button type='submit' variant='primary'>Submit</Button>
                                    </Form>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                {eatery.isOpen? null : (<Message variant='danger'>Restaurant is closed, try after sometime</Message>)}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                    <Row>
                    <h2 className='menu-title py-3'>Menu</h2>
                    </Row>
                    
                    <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader" style={{color: 'white'}}>
                        Category
                        </ListSubheader>
                    }
                    className={classes.root}
                    >
                        
                        {   
                            Object.entries(groupBy(eatery.menu, "category")).map(([key, value]) => {
                                return(
                                    <Category name={key} menu={value} />
                                )
                            })
                        }
                    </List>

                </>



                
            
                )
            
            }
            
            
        </div>
    );
}

export default Menu;

