import * as api from "../../api/api.js"; //Importing everything from api.js and naming it 'api'

//"getPost()" is an Action Creator
//Action Creator are functions which return an action
//an action is just an object which has a type and a payload. The 'type' is the type of action (which are defined in reducers) and payload is the data being carried.

// ------------------------- DISPLAYING THE POSTS -------------------------------------------------

export const getPosts = () => async(dispatch)=> { //Here the callback function returns another callback function which is asynchronous

    try {

        const {data} = await api.fetchpost(); //Here we are first getting the response from the backend. The response is then stored in the 'data' object.(data basically represents the posts)
        //Here 'data' is declared as an object and not a simple variable bcoz the response will be in the form of object. So it should be in the same form to contain that response.

        const action = { type: 'FETCH_ALL' , payload: data }; //creating an action having type 'FETCH_ALL' and payload as the 'data'(created above). The 'FETCH_ALL' here is defined in 'reducers/reducersPosts.js'
        dispatch(action); //This is basically returning the action. Instead of writing return, we need to dispatch the action.
    
    } catch (error) {
        console.log('---ErRoR---\n'+error);
    }
}

//------------------------------ CREATING A POST ---------------------------------

export const createPost = (post) => async(dispatch)=> { //Since it will be a POST call so we will get the parameter here as 'post'. This parameter specifies the body of POST request.
    try {

        const {data} = await api.createPost(post); //This is basically sending a POST request to the backend. It has the same concept as above. The response is stored in 'data' object.
        
        const action = {type:'CREATE', payload: data};//Creating an action same as above, this time of type 'CREATE'.
        dispatch(action); //Dispatching or returning the above action.

    } catch (error) {
        console.log('---ErRoR---\n'+error);
    }
}

// --------------------------- UPDATING A POST ------------------------------------------

export const updatePost = (id, updatedPost) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, updatedPost); //concept same as above.

        const action = {type:'UPDATE', payload: data};
        dispatch(action);
        
    } catch (error) {
        console.log("---- ErRor ------ \n"+error);
    }
}

// -------------------------- DELETING THE POST ------------------------------------

export const deletePost = (id) => async(dispatch) =>{
    try {
        
        await api.deletePost(id);
        
        const action = {type:'DELETE', payload: id};
        dispatch(action);
         
    } catch (error) {
        console.log('---frntend ErRoR---'+error);
    }
}

//------------------------ LIKING THE POST -----------------------------

export const likePost = (id) => async(dispatch)=> {
    try {
        const {data} = await api.likePost(id);

        const action = {type:'LIKE', payload:data};
        dispatch(action);
    } catch (error) {
        console.log('---frntend ErROR---'+error);
    }
}