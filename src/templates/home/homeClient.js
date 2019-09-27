import React from 'react';
import ReactDOM from 'react-dom';
import Home from 'src/templates/home/home';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import HomeStore from 'src/templates/home/homeStore';
import { Provider } from "react-redux";

//Init Isomorphic Styles:
const css = new Set();
const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()));

ReactDOM.hydrate(
	<Provider store={HomeStore}>
		<StyleContext.Provider value={{ insertCss }}>
			<Home />
		</StyleContext.Provider>
	</Provider>,
	document.getElementById('root')
)