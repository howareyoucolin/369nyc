import { FETCH_POSTS } from '../actionType';

const postInitialState = {
	posts: []
};

function postReducer(state = postInitialState, action) {
	if(action.type == FETCH_POSTS){
		return {
			...state,
			posts: action.payload
		}
	}
	return state;
};

export default postReducer;