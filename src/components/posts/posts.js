import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/withStyles';
import gs from 'src/global.css';
import s from './posts.css';

class Posts extends React.Component {
	
	constructor(props) {
		super(props);
	}
	
	render() {
		const { posts } = this.props;
		
		const postsList = posts.map( (post,index) => 
				<li key={post.id}>
					<div>{post.title}</div>
					<hr />
					<div>{post.content}</div>
					<hr />
				</li>
			);
			
		return (
			<div>
				<ul>{postsList}</ul>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return { 
		posts: state.postData.posts,
	};
};

export default connect(mapStateToProps,null)(withStyles(gs,s)(Posts));