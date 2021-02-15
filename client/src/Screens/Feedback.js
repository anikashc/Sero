import React from 'react';
import { Button, Row, Col, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import Eatery from '../Components/Eatery';
import Review from '../Components/Review';
import randomColor from 'randomcolor';

const reviews =[
    {
        name: 'David Beckham',
        email: 'david@gmail.com',
        phoneNumber: '1000020000',
        rating: 4,
        feedback: "Food was really excellent and service was fast"
    },
    {
        name: 'Virat Kohli',
        email: 'virat@gmail.com',
        phoneNumber: '1000020000',
        rating: 3,
        feedback: "The food was normal but service was quite good"
    },
    {
        name: 'PK Singh',
        email: 'singh@gmail.com',
        phoneNumber: '1000020000',
        rating: 1,
        feedback: "Food was undercooked"
    }
]

function Feedback(){
    
    return(
        <div>
            <h2>Feedback And Complaints</h2>
            {reviews.map((review) => {
                return(
                    <Review 
                        name={review.name}
                        email={review.email}
                        feedback={review.feedback}
                        rating={review.rating}
                        color={randomColor()}
                    />
                )
            })}
        </div>
    )
}

export default Feedback