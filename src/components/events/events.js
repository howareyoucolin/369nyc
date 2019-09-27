import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/withStyles';
import axios from 'axios';
import gs from 'src/global.css';

class Events extends React.Component {
	
	constructor(props) {
		super(props);
		this.addPost = this.addPost.bind(this);
	}
	
	//async _getData() {
	//	let results = await axios.get('http://api.369usa.com/posts');
	//	return results.data;
	//}

	addPost(){
		this.props.addPost();
	}
	
	render() {
		const { posts, counter } = this.props;
		return (
			<div>
				<p>This is a list of {counter} Events.</p>
				<p><button onClick={this.addPost}>Add Post</button></p>
				<ul>
					{posts.map((post,index) => <li key={index}>{post}</li>)}
				</ul>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addPost: () => dispatch({ type: 'ADD_POST' })
	}
}

const mapStateToProps = (state) => {
	return { 
		posts: state.postData.posts,
		counter: state.postData.counter
	};
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(gs)(Events));