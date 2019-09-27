import { FETCH_POSTS } from '../actionType';

export async function fetchPosts() {
	const delay = (duration) =>
  		new Promise(resolve => setTimeout(resolve, duration));
  	await delay(8000);
  	console.log('Testing Await Timeout');
	return {
		type: FETCH_POSTS
	}
}
