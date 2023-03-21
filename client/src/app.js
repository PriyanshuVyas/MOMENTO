import React, { useEffect } from 'react';
import {Container, AppBar,Grid, Typography, Grow } from '@material-ui/core';
import memoriesimg from './images/memoriesimg.png';
import Form from './Components/Form/Form';
import Posts from './Components/Posts/Posts';
import style from './style';
import { useState } from 'react'; //Importing useState hook, which will be used in updating post.

import { useDispatch } from 'react-redux'; //It is a hook and it allows us to dispatch an action
import {getPosts} from './redux/actions/actionsPosts.js';


const App = () => {
    const [currId, setcurrId] = useState(null); //Creating a 'currId' object to store the current id for each post. 'setcurrId' is the setter method. Initializing the useState and passing 'null' which will initially set the current id to null.
    const styleclasses = style();
    const dispatch = useDispatch(); //initializing dispatch

    useEffect( () => { //useEffect takes two parameter, one is a callback function another is an array
        dispatch(getPosts());
    },[currId,dispatch]); //Adding the currId later on, in order to show the updated post after clicking submit.

    return( //JSX structure
        <Container maxWidth='lg'>
            <AppBar className={styleclasses.appBar} position='static' color='inherit'>
                <Typography className={styleclasses.heading} variant='h2' align='center'> MOMENTO </Typography> 
                <img className={styleclasses.image} src={memoriesimg}  alt='memoriesIMG' height='60' width='60'/>
            </AppBar>
            <Grow in> 
                <Container>
                    <Grid container className={styleclasses.mainContainer} justifyContent ='space-between' alignItems='strech' spacing={3}>
                        <Grid item xs={12} sm={7}> 
                           <Posts setcurrId={setcurrId}/>

                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Form currId={currId} setcurrId={setcurrId}/>

                        </Grid>
                    </Grid>

                </Container>
            </Grow>
        </Container>
        
    );
};

export default App;