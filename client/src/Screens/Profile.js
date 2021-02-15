import React from 'react';
import { Row, Col, Container,Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import DashboardItem from '../Components/DashboardItem';

function Profile() {

    return (
        <>
            <Container className='py-3'>
                <Row>
                    <Col>
                        <LinkContainer to='/dashboardMenu'>
                            <Card style={{ height: '8rem', width: '8rem' }}>
                                <Card.Body>
                                    <Card.Title> Menu </Card.Title>
                                </Card.Body>
                            </Card>
                        </LinkContainer>
                    </Col>
                    <Col>
                        <LinkContainer to='/updateDetails'>
                            <Card style={{ height: '8rem', width: '8rem' }}>
                                <Card.Body>
                                    <Card.Title> Update Details </Card.Title>
                                </Card.Body>
                            </Card>
                        </LinkContainer>
                    </Col>
                    <Col>
                        <LinkContainer to='/feedback'>
                            <Card style={{ height: '8rem', width: '8rem' }}>
                                <Card.Body>
                                    <Card.Title> Feedback </Card.Title>
                                </Card.Body>
                            </Card>
                        </LinkContainer>
                    </Col>
                    <Col>
                        <LinkContainer to='/feedback'>
                            <Card style={{ height: '8rem', width: '8rem' }}>
                                <Card.Body>
                                    <Card.Title> Feedback </Card.Title>
                                </Card.Body>
                            </Card>
                        </LinkContainer>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Profile;