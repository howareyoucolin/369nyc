import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/withStyles';
import gs from 'src/global.css';
import s from './members.css';

class Members extends React.Component {
	
	constructor(props) {
		super(props);
	}
	
	render() {
		const { members } = this.props;
		
		const memberList = members.map( (member,index) => 
				<li className={s.member} key={member.id}>
					<div className={s.profileHolder}>
						<img className={s.profileImage} src={member.profile} />
					</div>
					<div className={s.detail}>
						<div>
							<b>{member.title}</b> &nbsp;
							<span className={s.male}>&#9794;</span>
						</div>
						<p className={s.subtitle}>法拉盛, 纽约</p>
						<p>{member.content}</p>
					</div>
				</li>
			);
			
		return (
			<div className={s.members}>
				<ul>{memberList}</ul>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return { 
		members: state.memberData.members,
	};
};

export default connect(mapStateToProps,null)(withStyles(gs,s)(Members));