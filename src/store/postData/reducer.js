import { FETCH_POSTS } from '../actionType';

const postInitialState = {
	posts: []
};

function postReducer(state = postInitialState, action) {
	if(action.type == FETCH_POSTS){
		return {
			...state,
			posts: [
				'sdfakjsad fsda fsdalf sdakf dsalfk 1111',
				'dasd sfdsafds a affd dfvd saf aes 222',
				'dasdfd sq ewnf gfds a re saf ereres 3333',
			]
		}
	}
	else if(action.type == 'ADD_POST'){
		return {
			...state,
			posts: state.posts.concat('xxxx xxx xxx xxxx new item xxx xx')
		}
	}
	return state;
};

export default postReducer;