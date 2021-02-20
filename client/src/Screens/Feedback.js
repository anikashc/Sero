import React, { useEffect} from 'react';
import randomColor from 'randomcolor';
// import { Row, Col, Container, InputGroup, FormControl } from 'react-bootstrap';
import Review from '../Components/Review';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import { getEateryReviews } from '../actions/eateryActions'


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
            dispatch(getEateryReviews(userInfo.eatery));
        }
    }, [dispatch, history, userInfo]);
    
    return(
        <div>
            <h2>Feedback And Complaints</h2>
            { loading? ( <Loader /> ) : error?  (<Message variant='danger'>{ error }</Message>) :
            (
                reviews.map((review) => {
                    return(
                        <Review 
                            name={review.name}
                            email={review.email}
                            comment={review.feedback}
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