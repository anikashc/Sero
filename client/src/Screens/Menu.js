import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Item from '../Components/Item';
//import item from '../item';
import { listEateryDetails} from '../actions/eateryActions'
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import StarRatings from 'react-star-ratings';

//import axios from 'axios'


const Menu = ({match}) => {
    // match.params.id or match.params. anything that is in the url
    //const eatery = eateries.find(p=>p._id===match.params.id)
    //const [eatery,setEatery] = useState({})
    const dispatch = useDispatch()
    const  eateryDetails = useSelector(state => state.eateryDetails) // call whatever you call in the store
    const {loading, error, eatery} = eateryDetails
    useEffect(()=>{
          dispatch(listEateryDetails(match.params.id))
    },[dispatch, match])
    
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
                                {eatery.isOpen? null : (<Message variant='danger'>Restaurant is closed, try after sometime</Message>)}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                    <Row>
                    <h2 className='menu-title py-3'>Menu</h2>
                    </Row>
                    {eatery.menu.map(item => (
                        <Row key={item._id}>
                            <Item item={item} eateryDetailProp={eatery}/>
                        </Row>
                    ))}

                </>



                
            
                )
            
            }
            
            
        </div>
    );
}

export default Menu;

