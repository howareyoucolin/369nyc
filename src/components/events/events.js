import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/withStyles';
import gs from 'src/global.css';
import s from './events.css';

class Events extends React.Component {
	
	constructor(props) {
		super(props);
	}
	
	render() {
		const { events } = this.props;
		const eventList = events.map( (event,index) => 
				<li className={s.event} key={index}>
					<h3>
						<a href="#">{event.post_title}</a>
					</h3>
					<p>{event.post_content}</p>
				</li>
			);
		return (
			<div className={s.events}>
				<ul>{eventList}</ul>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return { 
		events: state.eventData.events,
	};
};

export default connect(mapStateToProps,null)(withStyles(gs,s)(Events));