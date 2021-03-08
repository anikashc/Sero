import React from 'react';
import { Button } from 'react-bootstrap';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const PopUp = () => (
    <Popup trigger={<Button variant='warning'> Trigger</Button>} position="right center">
        <div>Popup content here !!</div>
    </Popup>
);

export default PopUp