const initialState = {
	posts: []
};

function fetchReducer(state = initialState, action) {
	if(action.type == 'FETCH_POSTS'){
		return {
			...state,
			posts: [
				'sdfakjsad fsda fsdalf sdakf dsalfk 1111',
				'dasd sfdsafds a affd dfvd saf aes 222',
				'dasdfd sq ewnf gfds a re saf ereres 3333',
			]
		}
	}
	return state;
};

export default fetchReducer;