import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import mongoose from 'mongoose';

import postRoute from './routes/post.js';

const app = express(); //Initializing express

app.use(bodyparser.json({limit:"30mb", extended:true})); //Setting up body-parser to parse the request containing JSON and URL
app.use(bodyparser.text({limit:"30mb", extended:true}));
//Request size limit is 30mb coz we will be sending images that might be big in size.

app.use(cors()); //cors for Cross-Origin Request

app.use('/post', postRoute);


//Setting up mongo
const CONNECTION_URL = 'mongodb+srv://admin:admin123@pv-cluster.udu8wja.mongodb.net/?retryWrites=true&w=majority'; //obtained from the connect cluster page. Copy pasted the url and edited the username and password.

const PORT = process.env.PORT || 3001;

//Connecting to mongoose
mongoose.connect(CONNECTION_URL, {useNewUrlParser:true, useUnifiedTopology:true})   //The parameters are not required, they are just mentioned to avoid the generated warnings.
    .then(() => app.listen(PORT, ()=> { //setting up a promise. If the connection is successful then listen on the port.
        console.log(`Server listening on port ${PORT}`)
    })) 
    .catch((error) => console.log(error.message)); //else catch the error

//mongoose.set('useFindAndModify',false);