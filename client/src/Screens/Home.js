import React, {useEffect} from 'react';
import { Row, Col } from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import Eatery from '../Components/Eatery';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import { listEateries} from '../actions/eateryActions'
function Home() {
    const dispatch = useDispatch()

    const  eateryList = useSelector(state => state.eateryList) // call whatever you call in the store
    const {loading, error, eateries} = eateryList
    useEffect(()=>{
        dispatch(listEateries())
    },[dispatch])

    

    return (
        <>
            <center>
                <h2>Trending Eateries</h2>    
            </center>
            {loading? (
                <Loader /> 
                )
            :   error ?(
                <Message variant='danger'>{error}</Message>
                ) 
            : (
            <Row>
                {eateries.map(eatery => (
                    <Col key={eatery._id} sm={12} md={6} lg={4} xl={3}>
                        <Eatery eatery={eatery}/>
                    </Col>
                ))}
            </Row>
            )
            
            }
            
        </>
    );
}

export default Home;
