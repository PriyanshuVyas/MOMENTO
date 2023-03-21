//This file represents the post component i.e a single post.

import React from "react";
import usestyles from './postStyle.js'; // Importing CSS styles

import { Card, CardActions, CardContent, CardMedia, Button, Typography  } from "@material-ui/core"; //Importing contents from material ui to create post
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'; //Importing thumbs up icon for like
import DeleteIcon from '@material-ui/icons/Delete';//Importing delete icon for delete
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'; //Importing the three dots icon for menu
import moment from 'moment'; //Importing 'moment' which was installed in the beginning to show time of post.

import { useDispatch } from "react-redux"; //Importing useDispatch hook in order to implement the delete functionality
import { deletePost, likePost } from "../../../redux/actions/actionsPosts.js";

const Post = ( {post, setcurrId} )=>{ //here 'post' parameter is the props. Props are arguments passing to React components. Here we are speading the props as post. //'setcurrId' is another prop I added later on while implementing update functionality.
    const styleclasses = usestyles(); //Initializing the CSS styles in order to use them for their respective components.
    const dispatch = useDispatch(); //Initializing useDispatch hook.

    return(
        <Card className={styleclasses.card}>
            <CardMedia className={styleclasses.media} image={post.selectedFile} title={post.title}/>
            <div className={styleclasses.overlay}>
                <Typography variant="h6">{post.creator}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>                                        
            </div>
            <div className={styleclasses.overlay2}>
                <Button style={{color:'white'}} size='small' title="Update Post" onClick={ () => setcurrId(post._id) } >
                    <MoreHorizIcon fontSize="default"/>
                </Button>
            </div>
            <div className={styleclasses.details}>
                <Typography variant="body2" color="textSecondary">{post.tags}</Typography>
            </div>
            <Typography className={styleclasses.title} variant='h6' gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography variant='body1' color="textSecondary" component="p">{post.message}</Typography>
            </CardContent>
            <CardActions className={styleclasses.cardActions}>
                <Button size='small' color='primary' onClick={ () => dispatch(likePost(post._id))}>
                    <ThumbUpAltIcon fontSize="small" />
                    Like {post.likeCount}
                </Button>
                <Button size='small' color='primary' onClick={ () => dispatch(deletePost(post._id)) }>
                    <DeleteIcon fontSize="small" />
                    Delete 
                </Button>
            </CardActions>
        </Card>
    )
};

export default Post;

/* -----------------COMMENTS--------------------------

-- In line 16, creating a Card which will contain the post. It will have CardMedia, CardContent and CardAction 
-- In line 17, CardMedia will hold the image to be displayed. If you hover over it will display the title.
-- In line 20, we are passing the createdAt() into moment and chaining the fromNow() method. This method basically represent time like '5 sec ago', '1 year ago' etc. like this instead of just displaying the date.

*/