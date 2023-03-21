import { combineReducers } from "redux";

import posts from './reducersPosts.js';

export default combineReducers({ posts }); //This posts will be called in /Components/Post/Posts.js