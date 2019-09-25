import React from 'react';
import ReactDOM from 'react-dom';
import Home from 'src/templates/home/home';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import { combineReducers, createStore } from 'redux';
import postReducer from "src/store/postData/reducer";
import { Provider } from "react-redux";

//Init store from window's data that is passed from SSR:
//combined reducers:
const combinedReducer = combineReducers({
    postData: postReducer
});
const store = createStore(combinedReducer,window.REDUX_DATA);

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