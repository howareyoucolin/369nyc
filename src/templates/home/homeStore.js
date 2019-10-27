import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import memberReducer from "src/store/memberData/reducer";
import { fetchMembers } from "src/store/memberData/actions";

//Redux store:
let store = null;
const combinedReducer = combineReducers({
    memberData: memberReducer
});

//Init store for SSR or CSR:
if (typeof window !== 'undefined') {
    store = createStore(combinedReducer, window.REDUX_DATA, applyMiddleware(thunk));
}
else{
	store = createStore(combinedReducer, applyMiddleware(thunk));
}

export default store;

export async function initHomeStoreData() {
	const actionList = [
		fetchMembers()
	];
	await Promise.all(actionList).then(values => {
		values.forEach( value => {
			store.dispatch(value);
		});
	});
}