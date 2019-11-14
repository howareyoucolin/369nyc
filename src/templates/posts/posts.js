import React from 'react';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/withStyles';
import cx from 'classnames';
import gs from 'src/global.css';
import s from './posts.css';
import PostsList from 'src/components/posts/posts';
import Header from 'src/components/header/header';
import Sidebar from 'src/components/sidebar/sidebar';

class Posts extends React.Component {

	render() {
		return (
			<div>
				<Header />
				<div className={cx(gs.container,s.members)}>
					<div className={gs.leftColumn}>

						<PostsList />

					</div>
					<div className={gs.rightColumn}>
						<Sidebar />
					</div>
				</div>
			</div>
		)
	}
}

export default withStyles(gs,s)(Posts);