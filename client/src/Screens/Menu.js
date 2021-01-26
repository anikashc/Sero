import React from 'react'
import {Link} from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Item from '../Components/Item';
import item from '../item';
import eateries from '../eateries';

const Menu = ({match}) => {
    // match.params.id or match.params. anything that is in the url
    const eatery = eateries.find(p=>p._id===match.params.id)
    return (
        <>
            <Link className="btn btn-dark my-3" to="/">Go Back</Link>
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
                    </ListGroup>
                </Col>
            </Row>
            <h2>Menu</h2>
            {item.map(item => (
                <Row key={item._id}>
                    <Item item={item} />
                </Row>
            ))}
        </>
    );
}

export default Menu;

