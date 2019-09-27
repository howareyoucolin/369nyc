import React from 'react';
import ReactDOM from 'react-dom';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import { Provider } from "react-redux";

//Init Isomorphic Styles:
export const css = new Set();
const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()));

export class CombinedProvider extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		const { store, children } = this.props;
		return (
			<Provider store={store}>
				<StyleContext.Provider value={{ insertCss }}>
					{ children }
				</StyleContext.Provider>
			</Provider>
		)
	}

}
