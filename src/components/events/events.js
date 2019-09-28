import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/withStyles';
import gs from 'src/global.css';

class Events extends React.Component {
	
	constructor(props) {
		super(props);
	}
	
	render() {
		const { posts, counter } = this.props;
		const postList = posts.map( (post,index) => 
				<li key={index}>
					<p>{post.post_title}</p>
					<p>{post.post_content}</p>
				</li>
			);
		return (
			<div>
				<ul>{postList}</ul>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return { 
		posts: state.postData.posts,
	};
};

export default connect(mapStateToProps,null)(withStyles(gs)(Events));