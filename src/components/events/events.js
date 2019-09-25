import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/withStyles';
import axios from 'axios';
import gs from 'src/global.css';

class Events extends React.Component {
	
	constructor(props) {
		super(props);
		this.testAction = this.testAction.bind(this);
	}
	
	//async _getData() {
	//	let results = await axios.get('http://api.369usa.com/posts');
	//	return results.data;
	//}

	testAction(){
		alert('daskdfjkasfa');
	}
	
	render() {
		const { posts } = this.props;
		return (
			<div>
				<p>This is a list of Events.</p>
				<p><button onClick={this.testAction}>Add Post</button></p>
				<ul>
					{posts.map((post,index) => <li key={index}>{post}</li>)}
				</ul>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return { posts: state.postData.posts };
};

export default connect(mapStateToProps)(withStyles(gs)(Events));