import axios from 'axios';
import { FETCH_EVENTS } from '../actionType';

export async function fetchEvents() {
	const results = await axios.get('http://api.369usa.com/events');
	return {
		type: FETCH_EVENTS,
		payload: results.data
	}
}
