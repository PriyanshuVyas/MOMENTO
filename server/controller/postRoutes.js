//All the logic of handling routes will be here.
 
import mongoose from "mongoose";
import postMessage from "../models/postMessage.js"; //Importing the created model to perform CRUD.

//------------------- GET request for displaying a post -----------------------------

export const getPost = async (req,res) => { // 'async' defines this function as an asynchronous function.
   
    try {
        const postMsg = await postMessage.find(); //'await' is because it is asynchronous
        res.status(200).json(postMsg);

   } catch (error) {
        res.status(404).json({message: error.message});
   }
}

//----------------------- POST request to create a new post -------------------------

export const createPost = async (req,res) => {
    
    const newPost = new postMessage(req.body); //creating new object in the 'postMessage' model by sending the request body into it. The request body will conatin the details of new post created by user.
    
    try {
        await newPost.save(); //Saving the received new post into the database using the save() method.
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message: error.message});
        
    }
}

//----------------------------- PATCH request to update the post -----------------------------

export const updatePost = async (req,res) =>{
    
    try {
        const { id: _id } = req.params; //Extracting the post id from the request parameter(i.e from url). Here we are renaming the post id from 'id' to '_id'
        const gettingPost = req.body; //Extracting the body of the request (which will be having the updated post) to the const 'gettingPost'
        const postChanges = {...gettingPost, _id}; //Spreading the acquired post and also adding the _id to it. Its like doing (gettingPost + _id). So now the post object will look like {creator:'', title:'', message:'', tags:'', selectedFile:'', _id:''}
    
        if( !mongoose.Types.ObjectId.isValid(_id) ){//Checking if the received id is valid or not
            console.log("ID is not valid");
            return res.status(404).send("Post Id invalid"); //If not then return with 404
        } 
    
        //Updating the post
        //Here 'postMessage' is the name of our database model. findByIdAndUpdate() method is used to find the post by its id and update it.
        const updatedPost = await postMessage.findByIdAndUpdate(_id, postChanges, {new: true}); //findByIdAndUpdate() accepts the '_id' (to identify which post), 'postChanges' (which are the changes made) and setting {new:true}.
        //By default findByIdAndUpdate() returns the object before updating. In order to receive the updated post we are passing the third parameter as {new:true}

        res.json(updatedPost); //sending the updated post as response in JSON format.
    } catch (error) {
        console.log('---backnd ErRoR---'+error);
    }
} 

// --------------------------- DELETE request to delete the post -----------------------

export const deletePost = async( req,res )=>{ //same as above
    
    try {
        const {id:_id} = req.params;
    
        if(mongoose.Types.ObjectId.isValid(_id)){
            console.log("ID is not valid");
            res.status(404).send("No post exist by this ID");
        }

        await postMessage.findByIdAndRemove(_id); //Finding the post by id and removing it.
        res.json({message:"Post Deleted"});
    
    } catch (error) {
        console.log('---bcknd ErRoR---');
    }
}

//----------------------PATCH request to Like the post----------------

export const likePost = async(req,res)=>{

    const {id:_id} = req.params; //same as above

    if(!mongoose.Types.ObjectId.isValid(_id)){
        console.log("Cannot Like: ID not valid");
        res.status(404).send("ID is not valid");
    }

    const currentPost = await postMessage.findById(_id); //Extracting the contents of the post on which like button is pressed by using its id.
    const likedPost = await postMessage.findByIdAndUpdate(_id, {likeCount: currentPost.likeCount + 1}, {new:true}); //Incrementing the like count by 1.

    res.json(likedPost);
}