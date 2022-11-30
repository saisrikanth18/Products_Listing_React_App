import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers/index';
import reduxThunk from 'redux-thunk';
import logger from 'redux-logger';

const middlewares = [reduxThunk];

if(process.env.NODE_ENV === "development"){
    middlewares.push(logger);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(...middlewares)));

export default store;