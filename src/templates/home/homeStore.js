import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import postReducer from "src/store/postData/reducer";
import { fetchPosts } from "src/store/postData/actions";

//Redux store:
let store = null;
const combinedReducer = combineReducers({
    postData: postReducer
});

//Init store for SSR or CSR:
if (typeof window !== 'undefined') {
    store = createStore(combinedReducer, window.REDUX_DATA, applyMiddleware(thunk));
}
else{
	store = createStore(combinedReducer, applyMiddleware(thunk));
}

export default store;