import { FETCH_MEMBERS } from '../actionType';

const memberInitialState = {
	members: []
};

function memberReducer(state = memberInitialState, action) {
	if(action.type == FETCH_MEMBERS){
		return {
			...state,
			members: action.payload
		}
	}
	return state;
};

export default memberReducer;