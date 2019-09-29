import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import eventReducer from "src/store/eventData/reducer";
import { fetchEvents } from "src/store/eventData/actions";

//Redux store:
let store = null;
const combinedReducer = combineReducers({
    eventData: eventReducer
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
		fetchEvents()
	];
	await Promise.all(actionList).then(values => {
		values.forEach( value => {
			store.dispatch(value);
		});
	});
}