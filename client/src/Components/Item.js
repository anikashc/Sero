import React from 'react'
import { Card } from 'react-bootstrap'

const Item = ({ item }) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <a href={`/eatery/${item._id}`}>
                <Card.Img src={item.image} />
            </a>

            <Card.Body>
                <a href={`/eatery/${item._id}`}>
                    <Card.Title as='div'>
                        <strong cl>{item.name}</strong>
                    </Card.Title>
                </a>
                <Card.Text as='div'>
                    {item.description}
                </Card.Text>

                <Card.Text as='h4'>
                    {item.price} Rs
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Item;