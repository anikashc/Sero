import React from 'react';
import { Row, Col } from 'react-bootstrap';
import eateries from '../eateries';
import Eatery from '../Components/Eatery';

function Home() {
    return (
        <>
            <center>
                <h2>Trending Eateries</h2>    
            </center>
            <Row>
                {eateries.map(eatery => (
                    <Col key={eatery._id} sm={12} md={6} lg={4} xl={3}>
                        <Eatery eatery={eatery}/>
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default Home;
