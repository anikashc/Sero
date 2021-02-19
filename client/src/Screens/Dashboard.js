import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const Dashboard = () => {
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    console.log(userInfo)
    return (
        <>
            <Container className='py-3'>
                <Row>
                    <Col>
                        <Link to={{
                            pathname: '/dashboardMenu',
                            state: {
                                eateryMenu: userInfo.eatery
                            }
                        }}>
                            <Card style={{ height: '8rem', width: '10rem' }}>
                                <Card.Body>
                                    <Card.Title> Menu </Card.Title>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                    <Col>
                        <Link to='/updateDetails'>
                            <Card style={{ height: '8rem', width: '10rem' }}>
                                <Card.Body>
                                    <Card.Title> Update Details </Card.Title>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                    <Col>
                        <Link to='/feedback'>
                            <Card style={{ height: '8rem', width: '10rem' }}>
                                <Card.Body>
                                    <Card.Title> Feedback </Card.Title>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                    <Col>
                        <Link to='/feedback'>
                            <Card style={{ height: '8rem', width: '10rem' }}>
                                <Card.Body>
                                    <Card.Title> Past Orders </Card.Title>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Dashboard;