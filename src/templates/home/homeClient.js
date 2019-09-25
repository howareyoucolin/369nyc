import React from 'react';
import ReactDOM from 'react-dom';
import Home from 'src/templates/home/home';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import { combineReducers, createStore } from 'redux';
import postReducer from "src/store/postData/reducer";
import { Provider } from "react-redux";

//combined reducers:
const combinedReducer = combineReducers({
    postData: postReducer
});

//Redux store:
const store = createStore(combinedReducer);
//Fetch Data:
store.dispatch({type: 'FETCH_POSTS'});

//Init Isomorphic Styles:
const css = new Set();
const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()));

ReactDOM.hydrate(
	<Provider store={store}>
		<StyleContext.Provider value={{ insertCss }}>
			<Home />
		</StyleContext.Provider>
	</Provider>,
	document.getElementById('root')
)