//A reducer accept two parameter, one is the state and another is the action performed.

export default  (posts = [], action) =>{ //state must be initialised. In our case state will be post and it will be an array so it is initialised to an empty array.
    switch(action.type){
        case 'UPDATE':
            return posts.map((post) => post._id === action.payload._id ? action.payload : post); //Here we are mapping over all the posts and inside that we have an ternary if condition. If the post id is equal to the action payload id (action payload is the updated post here) then return action payload. Else return the post itself (which is the old post here).
        case 'FETCH_ALL':
            return action.payload; //returning the payload (which is post data)
        case 'CREATE':
            return [...posts, action.payload];
        case 'DELETE':
            return posts.filter( (post) => post._id !== action.payload); //Here we are returning all the posts which is not equal to the payload(which is id here). Since the post with the given id is deleted we need to display all the post other than this id.
        case 'LIKE':
            return posts.map( (currPost) => currPost._id === action.payload._id? action.payload : currPost); //This is exactly same as the UPDATE above. Map over all posts, if the id is equal then return action payload else the post itself.
       
        default:
            return posts;
    }
}

