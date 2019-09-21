import React from 'react';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/withStyles';
import gs from '../../global.css';
import s from './header.css';

class Header extends React.Component {
	render() {
		return (
			<div className={s.header}>
				<div className={gs.container}>
					<h1 className={s.title}>369纽约活动网</h1>
				</div>
			</div>
		)
	}
}

export default withStyles(s,gs)(Header);