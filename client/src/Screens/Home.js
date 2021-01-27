import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Row, Col } from 'react-bootstrap';


import Eatery from '../Components/Eatery';
//import eateries from '../eateries';
function Home() {
    const [eateries,setEateries] = useState([])

    useEffect(()=>{
        const fetchEateries = async () =>{
            const {data}= await axios.get('/api/eateries')
            setEateries(data) 
        }
        fetchEateries()
    },[])

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
