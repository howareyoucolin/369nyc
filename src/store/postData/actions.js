import axios from 'axios';
import { FETCH_POSTS } from '../actionType';

export async function fetchPosts() {
	const results = await axios.get('http://api.369usa.com/posts');
	return {
		type: FETCH_POSTS,
		payload: results.data
	}
}
