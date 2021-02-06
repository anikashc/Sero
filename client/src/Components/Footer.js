import React from 'react'
import { Container, Row, Col, Navbar, Nav, Button } from 'react-bootstrap'
import { makeStyles } from '@material-ui/core/styles'
import {useSelector} from 'react-redux' 
import { LinkContainer} from 'react-router-bootstrap'
import Fab from '@material-ui/core/Fab'

const useStyles = makeStyles(theme => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

const Footer = () => {
    const cart = useSelector(state=>state.cart)
    const {cartItems, eateryDetails}=cart
    const classes = useStyles();
    return (
        <footer>
            <Container>
                
                <Row>
                    
                    {(cartItems.length && eateryDetails)?
                        (
                            <Navbar className='navbarFixedBottom'  fixed="bottom" variant='light'>
                                <LinkContainer to='/cart'>
                                    <Fab variant='extended' size='large' color='default' className={classes.fab}>
                                        <h6 className="linkText"> <i class="fas fa-shopping-cart fa-2x"></i> ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</h6>  
                                    </Fab>
                                </LinkContainer>
                            </Navbar>
                         
                        )
                    :
                        null
                    }
                </Row>
                <Row>
                    <Col className='text-center py-3'>
                    CopyRight &copy; Sero
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
