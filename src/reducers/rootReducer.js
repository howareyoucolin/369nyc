const initialState = {
	count: 10
};

function rootReducer(state = initialState, action) {
	if(action.type == 'INCREASE_COUNT'){
		return {
			...state,
			count: (state.count + 1) > 20 ? 20 : state.count + 1
		}
	}
	else if(action.type == 'DECREASE_COUNT'){
		return {
			...state,
			count: (state.count - 1) < 0 ? 0 : state.count - 1
		}
	}
	return state;
};

export default rootReducer;