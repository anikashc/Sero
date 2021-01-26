import React from 'react'
import { Card } from 'react-bootstrap'

const Eatery = ({eatery}) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <a href={`/menu/${eatery._id}`}>
                <Card.Img src={eatery.image} />
            </a>

            <Card.Body>
                <a href={`/menu/${eatery._id}`}>
                    <Card.Title as='div'>
                        <strong cl>{eatery.name}</strong>
                    </Card.Title>
                </a> 
                <Card.Text as='div'>
                    {eatery.rating}
                </Card.Text>

                <Card.Text as='h4'>
                    {eatery.price} Rs
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Eatery;