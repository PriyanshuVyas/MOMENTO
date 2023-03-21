//This will define all the routes realted to the post made on the app.
//The route logic is in the controller/postRoute.js

import express from 'express';
import { createPost, getPost, updatePost, deletePost, likePost } from '../controller/postRoutes.js';

const route = express.Router();

route.get('/',getPost); //The GET request which will be used to display the post
route.post('/',createPost); //The POST request which will be used to create the post
route.patch('/:id',updatePost); //The PATCH request used for updating the post with the given id.
route.delete('/:id',deletePost); //The DELETE request used to delete the post with the given id.
route.patch('/:id/like', likePost); //The PATCH request to Like the post for the given id. Also adding /like into the request so we know its for like.

export default route;