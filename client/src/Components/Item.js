import { disable } from 'colors';
import '../index.css';
import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux' 
import {Row,Button} from 'react-bootstrap'
import {addToCart} from '../actions/cartActions'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 10,
      width: '100%'
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      width: '90%',
      height: 'auto',
      backgroundColor: 'black',
      color: 'white'
      
    },
    image: {
      width: 128,
      height: 100,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }));

const Item = ({item,eateryDetailProp}) => {
    
    const cart = useSelector(state=>state.cart)
    const {cartItems,eateryDetails}=cart
    const dispatch = useDispatch()
    const classes = useStyles();
    const handleClick = (quantity) =>{
        
        dispatch(addToCart(item,eateryDetailProp,quantity))
    }
    var existingQty=0
    if(eateryDetails._id==eateryDetailProp._id){
        const existItem  = cartItems.find(x=>x.product === item._id)
        if(existItem){
            existingQty=existItem.qty
        }
        

    }
    const [qty,setQty]=useState(existingQty)
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                <Grid item>
                    
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                        <Typography gutterBottom>
                        {item.name} <div class="badge badge-danger ml-2">{item.isAvailable? null: 'Unavailable'}</div> 
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                        {item.description}
                        </Typography>
                        
                    </Grid>
                    
                    </Grid>
                    <Grid item>
                    <Typography align='right' >₹{item.cost}</Typography>
                    <Typography >
                        <Row><Button className='mx-3' size='sm' onClick={()=> {
                        setQty(qty-1)
                        handleClick(qty-1)
                        }} disabled={!eateryDetailProp.isOpen || qty<=0 || !item.isAvailable }>
                            <i class="fas fa-chevron-left"></i>
                        </Button>
                        
                        <Typography>{qty}</Typography>
                    
                        <Button className='mx-3' size='sm' onClick={()=> {
                            setQty(qty+1)
                            handleClick(qty+1)
                            }} disabled={!eateryDetailProp.isOpen || !item.isAvailable}>
                                <i class="fas fa-chevron-right"></i>
                        </Button></Row>
                        
                    </Typography>
                    </Grid>
                </Grid>
                </Grid>
            </Paper>
        </div>
        
        
    );
}

export default Item;