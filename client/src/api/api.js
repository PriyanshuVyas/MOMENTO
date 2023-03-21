//Here we are implementing API calls

import axios from 'axios'; //Imported axios to make api calls.

const backendUrl = 'http://localhost:3001/post'; //This is the url pointing to our backend route. This url will return all the post in the 'posts'.

export const fetchpost = () => axios.get(backendUrl); //Making a GET call on the url using axios and exporting it.
export const createPost = (newPost) => axios.post(backendUrl, newPost); //Making a POST call on the url using axios and exporting it.
//Here 'newPost' is the parameter referring to the entire post. The axios.post() function takes two parameter to make a POST call. First is the url and second is the data(or body) which is the newPost here. 

export const updatePost = (id, updatedPost) => axios.patch(`${backendUrl}/${id}`, updatedPost); //Making a PATCH request call to update post. The parameters are path with the id and the updated post.
export const deletePost = (id) => axios.delete(`${backendUrl}/${id}`); //Making the DELETE request using axios. The parameter is the id of the post which is to be deleted.
export const likePost = (id) => axios.patch(`${backendUrl}/${id}/like`); //Making the PATCH request using axios to Like the post.

//This exports will be imported in /redux/actions/actionsPosts.js/