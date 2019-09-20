import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/header';

export default class Home extends React.Component {
	render() {
		return (
			<div>
				<Header />
				<div>This is home page!</div>
			</div>
		)
	}
}

