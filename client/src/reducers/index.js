import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { authReducers } from './auth-reducers';
import { imagesReducers } from './image-reducers';


export const init = () => {
    const reducers = combineReducers({
        auth: authReducers,
        images: imagesReducers,
    });
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

    return store;

}