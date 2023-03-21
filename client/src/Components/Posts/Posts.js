//Here we are displaying all the posts in the app.

import React from "react";
import Post from "./post/post";
import useStyles from './PostsStyle.js'
import { useSelector } from "react-redux";

import { CircularProgress, Grid } from "@material-ui/core"; //Importing for creating the structure to display posts on the app.

const Posts = ( {setcurrId} )=>{ //Accepting the props received from app.js
    //Initializing useSelector as a hook
    const posts = useSelector((state) => state.posts ); //the callback function takes the state parameter and returns state posts (This posts is from /reducers/indexReducer.js)
    const styleclasses = useStyles();
    console.log("The post is here: "+posts);

    return( // Basically it is written using ternery operator since it wont support if-else. Here if the post length is not there then it will return <CircularProgress> else the follwing <Grid>.
        
        !posts.length? <CircularProgress />:(
        <Grid container className={styleclasses.container} alignItems="stretch" spacing={3}>
            {posts.map( (post) => (
                <Grid item key={post._id} xs={12} sm={6}>
                    <Post post = {post} setcurrId={setcurrId}/>
                </Grid>
            ) )}
        </Grid>
        )
    );
};

export default Posts;

/* -----------------------COMMENTS-----------
- (from line 18) This is a ternary expression(at line 18). Here the logic is, if the post exist then we will send it. We are returning a Grid container which will contain the post.
    The logic is to loop over all the posts and return the desired post.
    Inside the container, we are mapping all the post.
    The 'posts' has all the post. It will receive a parameter 'post' which is the requested post. Its id will be matched and if it exist then it returns it.
    It returns a Grid Item containing the requested post. The requested 'post' is imported from /post/post.js/

*/