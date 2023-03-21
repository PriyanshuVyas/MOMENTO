import mongoose from "mongoose";

//defining mongo Schema for the post body
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String, //This will be the image. It will be converted to String using the react-file-base64.
    likeCount: {
        type: Number, 
        default: 0
    },
    createdAt: {
        type: Date, 
        default: new Date()
    }
});

//creating model named 
const postMessage = mongoose.model('postMessage',postSchema); //Here the parameter 'postMessage' is the name of the model which is stored in a constant of same name to be exported.

export default postMessage;
//Exporting the mongoose model so we can use it to perform CRUD operations.