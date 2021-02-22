import React from 'react';
import {Row, Button, ButtonGroup, Card, Col } from 'react-bootstrap';

const DashboardItem = ({key, menu}) => {
    return (
        <>
            <h2>{key}</h2>
            {menu.map((item) => {
                return(
                    <Row>
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
                    </Row>
                )
            })}
        </>
    );
}

export default DashboardItem;