import React from 'react';
import ReactDOM from 'react-dom';
import Blog from 'src/templates/blog/blog';
import { CombinedProvider } from 'src/includes/combinedProvider';
import BlogStore from 'src/templates/blog/blogStore';

ReactDOM.hydrate(
	<CombinedProvider store={BlogStore}>
		<Blog />
	</CombinedProvider>,
	document.getElementById('root')
)