import React from 'react';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/withStyles';
import gs from 'src/global.css';

class Events extends React.Component {
	render() {
		return (
			<div>
				This is a list of Events.
			</div>
		)
	}
}

export default withStyles(gs)(Events);