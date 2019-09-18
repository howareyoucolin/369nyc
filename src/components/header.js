import React from 'react';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './header.css';

class Header extends React.Component {
	render() {
		return (
			<div className={s.title}>
				<p>xxwxx xxx xxx</p>
			</div>
		)
	}
}

export default withStyles(s)(Header);