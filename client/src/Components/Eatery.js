import React from 'react'
import {Link} from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Eatery = ({eatery}) => {
    return (
        <Card className='my-3 p-3 rounded bg-light'>
            
            <Link to={`/menu/${eatery._id}`}>
                    <div class="box">
                        <Card.Img src={eatery.image} variant='top' style={{opacity: 0.6}}/>
                        <div class="text">
                            <strong>{eatery.name}</strong>
                        </div>
                    </div>
                    
                    
                
                
            </Link>

            <Card.Body className='card-body' style={{color: 'white'}}>
                
                <Card.Text as='div'>
                    {eatery.rating} from {eatery.numReviews} reviews
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Eatery;