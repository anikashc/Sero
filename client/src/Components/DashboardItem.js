import React from 'react';
import { Button, ButtonGroup, Card } from 'react-bootstrap';

const DashboardItem = ({item}) => {
    return (
        <Card style={{ height: '10rem', width: '50rem' }}>
            <Card.Body>
                <Card.Title> { item.name } </Card.Title>
            </Card.Body>
            <ButtonGroup>
                <Button variant='warning'>Edit</Button>
                <Button variant='danger'>Delete</Button>
            </ButtonGroup>
        </Card>
    );
}

export default DashboardItem;