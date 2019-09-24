import React from 'react';
import ReactDOM from 'react-dom';
import Home from 'src/templates/Home/Home';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import { createStore } from "redux";
import rootReducer from "src/reducers/rootReducer";
import { Provider } from "react-redux";

// Redux store:
const store = createStore(rootReducer);

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