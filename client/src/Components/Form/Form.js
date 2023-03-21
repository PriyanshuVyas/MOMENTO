import React from "react";
import { useState, useEffect } from "react"; //Importing useState hook. useEffect hook is also later imported while implementing the update functionality.
import { TextField, Paper, Button, Typography } from "@material-ui/core"; //Importing components to design form
import formStyle from './Formstyle.js'; //Importing the CSS style files
import FileBase from 'react-file-base64'; //Importing FileBase for converting image into string
import {useDispatch} from 'react-redux';
import { useSelector } from "react-redux"; //It will be used to fetch the updated post while implementing update functionality
import { createPost, updatePost } from "../../redux/actions/actionsPosts.js"

const Form = ( {currId,setcurrId} )=>{ //Accepting the props received from the app.js (which is the currId and setcurrId)
    const styleclasses = formStyle();

    const [postData, setPostData] = useState({ //Defining an empty object in usestate
        creator:'', title:'', message:'', tags:'', selectedFile:'' //Properties that the object is going to start with. All are initialized to empty string at first.
    }); //'setPostData' is the setter method for the state
    const oldPost = useSelector((state) => (currId? state.posts.find( (p) => p._id === currId ) : null)); //This will be used to get the old post and repopulate the input fields with its data so user can update it. Here IF the current id exists then we are looping over all the posts to find that one post 'p' whose id is equal to the cuurent id. Else return null.

    const dispatch = useDispatch(); //This allow us to actually dispatch our actions. It should be used on submit button.
    
    
    const submitHandler = (event)=>{ //This will be the function called after submit. 
    //Once the user click submit, we will check if currId exists. If it exists then user is updating the post. Else the user is creating a post and want to send over a POST request with all the data that user entered.

        event.preventDefault(); //This is to prevent refresh in the browser while submitting.
        if(currId){
            dispatch( updatePost(currId,postData) ); //dispaching the updated post. First the current ID and and updated post data is send to updatedPost() and then whatever returned is dispatched.
        }else{
            dispatch( createPost(postData) ); //dispatching the received post data. Here first the postData is sended to createPost() and then it is dispatched.
        }
        clear(); //Calling the clear() function so that after submit the forms can be cleared.
    }
    //useEffect accepts two parameters, first a callback func and second a dependency array. This array basically determines when the callback function should be called. So in this, when the value of 'oldPost' is something i.e. when it gets the returned value, then the callback func should be called.
    useEffect( ()=>{ 
        if(oldPost) setPostData(oldPost);
    },[oldPost]) //

    const clear = ()=>{ //Defining the callback for Clear button. This will clear all the textfields.
        setcurrId(null); //Setting the current Id to null 
        setPostData({creator:'', title:'', message:'', tags:'', selectedFile:''});
    }; 
    
    //---------------------- The return function ---------------------------
    return(
        <Paper className={styleclasses.paper}>
            <form autoComplete="off" noValidate className={`${styleclasses.root} ${styleclasses.form}`} onSubmit={submitHandler}>
                <Typography variant="h6">{currId? `Edit the post` : `Create a Post`}</Typography>
                <TextField name="creator" 
                           variant="outlined" 
                           label="Creator" 
                           fullWidth
                           value={postData.creator} 
                           onChange={(event)=>setPostData({ ...postData, creator:event.target.value})}
                />
                <TextField name="title" 
                           variant="outlined" 
                           label="Title" 
                           fullWidth
                           value={postData.title} 
                           onChange={(event)=>setPostData({ ...postData, title:event.target.value})}
                />
                <TextField name="message" 
                           variant="outlined" 
                           label="Message" 
                           fullWidth
                           value={postData.message} 
                           onChange={(event)=>setPostData({ ...postData, message:event.target.value})}
                />
                <TextField name="tags" 
                           variant="outlined" 
                           label="Tags" 
                           fullWidth
                           value={postData.tags} 
                           onChange={(event)=>setPostData({ ...postData, tags:event.target.value.split(',')})}
                />
                <div className={styleclasses.fileInput}>
                    <FileBase type='file'
                              multiple={false}
                              onDone={ ({base64}) => setPostData( {...postData, selectedFile:base64} ) }
                    />
                </div>
                <Button className={styleclasses.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
                <div><br /></div>
                <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>


            </form>
        </Paper>
    )
};

export default Form;

/* COMMENTING HERE SINCE THERE IS SOME ISSUE WHILE COMMENTING IN ABOVE JSX

-- In line52, the 'onChange' property determines what to do on change. 
*/