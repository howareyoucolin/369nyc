import { FETCH_EVENTS } from '../actionType';

const eventInitialState = {
	events: []
};

function eventReducer(state = eventInitialState, action) {
	if(action.type == FETCH_EVENTS){
		return {
			...state,
			events: action.payload
		}
	}
	return state;
};

export default eventReducer;