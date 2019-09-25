export function fetchPosts() {
	const action = {
		type: 'FETCH_POSTS',
	}
	dispatch(action)
}