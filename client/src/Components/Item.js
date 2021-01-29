import { disable } from 'colors';
import '../index.css';
import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux' 
import { Card, Col, Row, ListGroup, Button} from 'react-bootstrap'
import {addToCart} from '../actions/cartActions'

const Item = ({item, isOpen, eateryId}) => {
    const [qty,setQty]=useState(0)

    const dispatch = useDispatch()
    
    const handleClick = (quantity) =>{
        
        dispatch(addToCart(item._id,eateryId,quantity))
    }
    return (
        <Card className='my-1 p-1 rounded'>
            
            <Row>
                
                <Col md={7}>
                    <Card.Body>
                        <Card.Title as='div'>
                            <strong cl>{item.name}</strong>
                        </Card.Title>
                        <Card.Text as='div'>
                            {item.description}
                        </Card.Text>
                    </Card.Body>
                </Col>
                
                <Col md={2}>
                    <Card.Body>

                        <Card.Img src={item.image} className='itemImg' />
                    </Card.Body>
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                                <Row className='quantity'>

                                <Button className='mx-3' onClick={()=> {
                                    setQty(qty-1)
                                    handleClick(qty-1)
                                    }} disabled={!isOpen || qty<=0 || !item.isAvailable }>
                                        <i class="fas fa-chevron-left"></i>
                                </Button>
                                
                                <h5>{qty}</h5>
                            
                                <Button className='mx-3' onClick={()=> {
                                    setQty(qty+1)
                                    handleClick(qty+1)
                                    }} disabled={!isOpen || !item.isAvailable}>
                                        <i class="fas fa-chevron-right"></i>
                                </Button>
                                </Row>
                                
                           
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Card.Text as='h4'>
                                ₹{item.cost} {item.isAvailable? null: 'Unavailable'}
                            </Card.Text>
                        </ListGroup.Item>
                        
                    </ListGroup>
                </Col>
                
            </Row>

            
        </Card>
    );
}

export default Item;