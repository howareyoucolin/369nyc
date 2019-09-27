import React from 'react';
import ReactDOM from 'react-dom';
import Home from 'src/templates/home/home';
import { CombinedProvider, css } from 'src/includes/combinedProvider';
import HomeStore from 'src/templates/home/homeStore';

ReactDOM.hydrate(
	<CombinedProvider store={HomeStore}>
		<Home />
	</CombinedProvider>,
	document.getElementById('root')
)