import React, { useEffect, useState } from 'react';
import { Row, Col, Container, InputGroup, FormControl, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Eatery from '../Components/Eatery';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import { listEateries } from '../actions/eateryActions'
import { Link } from 'react-router-dom';

const Home = () => {

    const dispatch = useDispatch();

    const [input, setInput] = useState("");
    const [openList, setOpenList] = useState(false);

    const eateryList = useSelector(state => state.eateryList);
    const {loading, error, eateries} = eateryList;

    let openListEateries = eateries

    useEffect(() => {

        dispatch(listEateries());
    }, [dispatch]);

    const handleChange = (e) => {
        setOpenList(true)
        e.preventDefault();
        setInput(e.target.value);
    }
    
    if(input.length > 0) {
        
        let typed=input.toLowerCase()
        openListEateries = openListEateries.filter((i) => {
            return i.name.toLowerCase().match(typed);
        });
    }
    else if(input.length === 0 && openList){
        setOpenList(false)
    }
    
    
    

    return (
        <>
            {loading ? (
                <Loader /> )
            : error ? (
                <Message variant='danger'>{error}</Message>) 
            : (
                <React.Fragment>
                    <header className="masthead text-white text-center">
                        <div className="overlay"></div>
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-9 mx-auto">
                                    <h1 className="mb-5">Order from your favourite eatery without touching the menu...</h1>
                                </div>
                                <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
                                    <form>
                                        <div className="form-row">
                                        
                                        <InputGroup className="mb-3">
                                            
                                            <FormControl size='lg'
                                            placeholder="Find the menu"
                                            aria-label="FindMenu"
                                            aria-describedby="basic-addon1"
                                            onChange={handleChange}
                                            value={input}
                                            />
                                        </InputGroup>
                                        {openList?(

                                        <ListGroup>
                                            {openListEateries.length===0?(
                                                <ListGroup.Item fluid>
                                                    Sorry not with us right now ':('
                                                </ListGroup.Item>   
                                            ):(
                                                openListEateries.map(openListEatery => (
                                                    <Link to={`/menu/${openListEatery._id}`}>
                                                        <ListGroup.Item key={openListEatery._id}>
                                                            {openListEatery.active?openListEatery.name:null}
                                                        </ListGroup.Item>
                                                    </Link>
                                                ))
                                            )}
                                        </ListGroup>
                                        ):null}

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </header>
                    
                    <Container className="features-icons">
                        <center>
                                <h2 className='mt-10 pt-10'>Trending Eateries...</h2>
                        </center>
                        
                        <Row className='px-10'>
                            {eateries.map(eatery => (
                                <Col key={eatery._id} sm={12} md={6} lg={4} xl={3}>
                                    {eatery.active?<Eatery eatery={eatery}/>:null}
                                 
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </React.Fragment>
            )}
        </>
    );
}

export default Home;
