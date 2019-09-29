import React from 'react';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/withStyles';
import cx from 'classnames';
import gs from 'src/global.css';
import s from './home.css';
import Header from 'src/components/header/header';
import Events from 'src/components/events/events';

class Home extends React.Component {

	render() {
		return (
			<div>
				<Header />
				<div className={cx(gs.container,s.events)}>
					<div className={gs.leftColumn}>
						<Events />
					</div>
				</div>
			</div>
		)
	}
}

export default withStyles(gs,s)(Home);