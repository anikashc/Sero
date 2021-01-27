import React from 'react'
import { Card, Col, Row, ListGroup} from 'react-bootstrap'

const Item = ({ item }) => {
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
                                <Row>

                                <Col md={1}>
                                <i class="fas fa-minus"></i>
                                </Col>
                                <Col md={1}>
                                1
                                </Col>
                                <Col md={1}>
                                <i class="fas fa-plus"></i>
                                </Col>
                                </Row>
                                
                           
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Card.Text as='h4'>
                                ₹{item.price}
                            </Card.Text>
                        </ListGroup.Item>
                        
                    </ListGroup>
                </Col>
                
            </Row>

            
        </Card>
    );
}

export default Item;