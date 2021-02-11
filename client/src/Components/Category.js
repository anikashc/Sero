import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Item from '../Components/Item';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const Category = ({name, menu}) => {
    const  eateryDetails = useSelector(state => state.eateryDetails) // call whatever you call in the store
    const {eatery} = eateryDetails
    const [openCategory, setOpenCategory] = React.useState(true);

    const handleClick = () => {
        setOpenCategory(!openCategory);
    };

    return(
        <div>
            <ListItem button onClick={handleClick}>
                            
                <ListItemText primary= {name} />
                    {openCategory ? <i class="fas fa-chevron-up"></i> : <i class="fas fa-chevron-down"></i>}
            </ListItem>
            <Collapse in={openCategory} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {menu.map(item => (
                        <Row key={item._id}>
                            <Item item={item} eateryDetailProp={eatery}/>
                        </Row>
                    ))}
                                                
                </List>
            </Collapse>
        </div>
    )
}

export default Category;