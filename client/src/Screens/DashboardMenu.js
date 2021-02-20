import React from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import DashboardItem from '../Components/DashboardItem';


function DashboardMenu(props) {
    const {eateryMenu} = props.location.state

    return (
        <>
            <Container className='py-3'>
                <LinkContainer to='/dashboard'>
                    <Button variant='secondary'>Back</Button>
                </LinkContainer>
                <h1>Menu</h1>
                <Button>Add</Button>
            </Container>

            <Container className='py-3'>
                <Row>

                    {eateryMenu.map((item => 
                        <Col className='py-3'> <DashboardItem item={item}/> </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}

export default DashboardMenu;