import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Item from '../Components/Item';
import item from '../item';

const Menu = () => {
    return (
        <>
            {item.map(item => (
                <Row>
                    <Item item={item} />
                </Row>
            ))}
        </>
    );
}

export default Menu;

