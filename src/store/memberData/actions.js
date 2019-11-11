import axios from 'axios';
import { FETCH_MEMBERS } from '../actionType';

export async function fetchMembers() {
	const results = await axios.get('https://api.369usa.com/members');
	return {
		type: FETCH_MEMBERS,
		payload: results.data
	}
}
