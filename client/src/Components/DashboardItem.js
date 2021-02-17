import React from 'react';
import { Button, ButtonGroup, Card, Col } from 'react-bootstrap';

const DashboardItem = ({item}) => {
    return (
        <Card style={{ height: '5rem', width: '50rem' }}>
            <Card.Body>
                <Card.Title> { item.name } </Card.Title>
            </Card.Body>
            <ButtonGroup>
                <Col>
                <Button variant='warning'>Edit</Button>
                </Col>
                <Col>
                <Button variant='warning'>Edit</Button>
                </Col>
            </ButtonGroup>
        </Card>
    );
}

export default DashboardItem;