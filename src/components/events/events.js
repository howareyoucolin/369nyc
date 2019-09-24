import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/withStyles';
import axios from 'axios';
import gs from 'src/global.css';

class Events extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			posts: ['dasfasf as f sa fas fas fds ','asdas d a fqw f wqf wa dfsa fdsa s']
		}
		this.testAction = this.testAction.bind(this);
	}
	
	async _getData() {
		let results = await axios.get('http://api.369usa.com/posts');
		return results.data;
	}

	testAction(){
		alert('daskdfjkasfa');
	}
	
	render() {
		return (
			<div>
				<p>This is a list of { this.props.count } Events.</p>
				<p><button onClick={this.testAction}>Add Post</button></p>
				<ul>
					{this.state.posts.map((post,index) => <li key={index}>{post}</li>)}
				</ul>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return { count: state.count };
};

export default connect(mapStateToProps)(withStyles(gs)(Events));