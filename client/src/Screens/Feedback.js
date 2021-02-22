import React, { useEffect} from 'react';
import randomColor from 'randomcolor';
// import { Row, Col, Container, InputGroup, FormControl } from 'react-bootstrap';
import Review from '../Components/Review';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import { getEateryReviews } from '../actions/eateryActions'
import { LinkContainer } from 'react-router-bootstrap';
import {Button, Container} from 'react-bootstrap'


const Feedback = ({history}) =>{
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const reviewList = useSelector(state => state.eateryReviews);
    const {error, loading, reviews} = reviewList;
    
    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
        else{
            if(userInfo.eatery){
                dispatch(getEateryReviews(userInfo.eatery));
            }
        }
    }, [dispatch, history, userInfo]);
    
    return(
        <div>
                <LinkContainer to='/dashboard' className='my-3'>
                    <Button variant='secondary'>Back</Button>
                </LinkContainer>
                <h2>Feedback and Complaints</h2>
            { loading? ( <Loader /> ) : error?  (<Message variant='danger'>{ error }</Message>) :
            (
                reviews.map((review) => {
                    return(
                        <Review 
                            name={review.name}
                            email={review.email}
                            comment={review.comment}
                            rating={review.rating}
                            color={randomColor()}
                        />
                    )
                })
            )
            }
            
        </div>
    )
}

export default Feedback