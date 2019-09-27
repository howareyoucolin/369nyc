import { FETCH_POSTS } from '../actionType';

export async function fetchPosts() {
	const delay = (duration) =>
  		new Promise(resolve => setTimeout(resolve, duration));
  	await delay(8000);
  	console.log('fetchPosts waited 8 secs');
	return {
		type: FETCH_POSTS
	}
}

export async function fetchTen() {
	const delay = (duration) =>
  		new Promise(resolve => setTimeout(resolve, duration));
  	await delay(5000);
  	console.log('fetchTen waited 5 secs');
	return {
		type: 'FETCH_TEN'
	}
}