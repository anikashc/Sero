import React from 'react'
import {Link} from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Eatery = ({eatery}) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <Link to={`/menu/${eatery._id}`}>
                <Card.Img src={eatery.image} variant='top'/>
            </Link>

            <Card.Body>
                <Link to={`/menu/${eatery._id}`}>
                    <Card.Title as='div'>
                        <strong>{eatery.name}</strong>
                    </Card.Title>
                </Link> 
                <Card.Text as='div'>
                    {eatery.rating} from {eatery.numReviews} reviews
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Eatery;