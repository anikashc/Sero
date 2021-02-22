import React from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import DashboardItem from '../Components/DashboardItem';

const groupBy = (objectArray, property) => {
    return objectArray.reduce((acc, obj) => {
       const key = obj[property];
       if (!acc[key]) {
          acc[key] = [];
       }
       // Add object to list for given key's value
       acc[key].push(obj);
       return acc;
    }, {});
 }


function DashboardMenu(props) {
    const {eateryMenu} = props.location.state
    const menu = groupBy(eateryMenu, 'category')

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    return (
        <>
            <Container className='py-3'>
                {userInfo.userType===1?(
                    <LinkContainer to='/admin/eaterylist'>
                        <Button variant='secondary'>Back</Button>
                    </LinkContainer>
                ):(
                    <LinkContainer to='/dashboard'>
                        <Button variant='secondary'>Back</Button>
                    </LinkContainer>
                )}
                
                <h1>Menu</h1>
                <Button>Add</Button>
            </Container>

            <Container className='py-3'>
                <Row>

                    {/* {eateryMenu.map((item => 
                        <Col className='py-3'> <DashboardItem item={item}/> </Col>
                    ))} */}
                    {Object.keys(menu).map((key, i) => 
                        (
                            <Col className='py-3' key={i}>
                                <h3>{key}</h3>
                                <DashboardItem key={key} menu={menu[key]}/> 
                            </Col>
                        )
                    )}
                </Row>
            </Container>
        </>
    );
}

export default DashboardMenu;