import React from 'react';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/withStyles';
import axios from 'axios';
import gs from 'src/global.css';

class Events extends React.Component {
	
	constructor(props) {
		super(props);
	}
	
	async _getData() {
		let results = await axios.get('http://api.369usa.com/posts');
		return results.data;
	}
	
	render() {
		return (
			<div>
				<p>This is a list of Events.</p>
				<ul>
					{posts.map(post => <li>{post.post_title}</li>)}
				</ul>
			</div>
		)
	}
}

export default withStyles(gs)(Events);