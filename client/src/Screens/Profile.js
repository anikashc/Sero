import React from 'react';
import { Button, Row, Col, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import Eatery from '../Components/Eatery';

function Profile() {

    const eatery = {
        name: 'Barista',
        address: 'M block, middle circle, CP',
        image: '/images/airpods.jpg',
        category: 'cafe',
        description: 'Have coffee Enjoyyyyyyyyyyyy',
        payNowEnable: false,
        payLaterEnable: true,
        price: 89.99,
        menu: [
            { name: "Chicken Tikka", cost: 78, category: "starters", image: "/images/camera.jpg", description: "Real malai with chicken", isAvailable: true },
            { name: "Honey chilli potato", cost: 23, category: "starters", image: "/images/camera.jpg", description: "Real malai with chicken", isAvailable: true },
            { name: "Spring roll", cost: 73, category: "starters", image: "/images/camera.jpg", description: "Real malai with chicken", isAvailable: false },
            { name: "Malai Chaap", cost: 78, category: "starters", image: "/images/camera.jpg", description: "Real malai with chicken", isAvailable: true },

        ],
        rating: 4.5,
        numReviews: 12,
    }

    return (
        <>
            <Eatery eatery={eatery} />
            <Container>
                <Row>
                    <Col>
                        <LinkContainer to='/updateDetails'>
                            <Button className='primary'>Update Details</Button>
                        </LinkContainer>
                    </Col>
                    <Col>
                        <LinkContainer to='/addItem'>
                            <Button className='primary'>Add item</Button>
                        </LinkContainer>
                    </Col>
                    <Col>
                        <Button className='primary'>Previous Orders</Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Profile;