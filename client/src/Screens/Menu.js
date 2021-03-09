import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { Row, Col, Image, ListGroup, Form, Button} from 'react-bootstrap'

import { listEateryDetails} from '../actions/eateryActions'
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import StarRatings from 'react-star-ratings';

import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';

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

const Menu = ({match, location}) => {
    // match.params.id or match.params. anything that is in the url
    const redirect = location.search? location.search.split('=')[1]:null
    const dispatch = useDispatch()

    const  eateryDetails = useSelector(state => state.eateryDetails) // call whatever you call in the store
    const {loading, error, eatery} = eateryDetails

    useEffect(()=>{
          dispatch(listEateryDetails(match.params.id))
    },[dispatch, match,redirect])

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
                        {redirect?null:(    
                            <Col md={6}>
                                <Image src={`https://sero2021.s3.ap-south-1.amazonaws.com/${eatery.image}`} alt={eatery.name } fluid />
                            </Col>
                        )}
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

