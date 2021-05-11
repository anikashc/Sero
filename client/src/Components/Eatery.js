import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import StarRatings from 'react-star-ratings'

const Eatery = ({eatery}) => {
    return (
        <Card className='my-3 p-3 rounded bg-light'>
            
            <Link to={`/menu/${eatery._id}`}>
                <div class="box">
                    <Card.Img src={`https://sero2021.s3.ap-south-1.amazonaws.com/${eatery.image}`} variant='top' className='card-image' />
                    <div class="text">
                        <strong>{eatery.name}</strong>
                    </div>
                </div>  
            </Link>

            <Card.Body className='card-body' style={{color: 'white'}}>
                <Card.Text as='div' style={{marginBottom: '0.5rem'}}>
                <StarRatings
                    rating={eatery.rating}
                    starRatedColor="#FFDF00"
                    starEmptyColor="#585858"
                    starDimension="1.5rem"
                    starSpacing="5px"
                />
                </Card.Text>
                <Card.Text as='div'>
                    {eatery.rating} from {eatery.numReviews} reviews
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Eatery;