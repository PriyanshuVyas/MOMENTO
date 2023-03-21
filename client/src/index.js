import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import {  createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './redux/reducers/indexReducer.js'

import App from './app';
import './background.css'; //Importing the Background of the app


const store = createStore(reducers, compose(applyMiddleware(thunk)));

//wrapping application in a provider component
ReactDom.render(
<Provider store={store}>    
    <App />
</Provider>,
document.getElementById('root')); //connecting to the div with an ID of root
