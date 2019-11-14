import path from 'path';
import axios from 'axios';

import React from 'react';
import ReactDOM from 'react-dom';
import { renderToString } from "react-dom/server";

import { CombinedProvider, css } from 'src/includes/combinedProvider';
import { commonCss } from 'src/includes/commonCss';

import PostStore, { initPostsStoreData } from 'src/templates/posts/postsStore';
import Posts from 'src/templates/posts/posts';

export default function(app,route){

	app.get(route, function (req, res) {

		//Fetch Data:
	    initPostsStoreData().then( () => {
		
			//Render HTML:
			const body = renderToString(
					<CombinedProvider store={PostStore}>
						<Posts />
					</CombinedProvider>
				);

			axios.get('http://api.369usa.com/page-meta/blog').then( (response) => {
				const meta = response.data;
				const html = `<!doctype html>
					<html>
						<head>
						<title>${meta.title}</title>
						<meta name="description" content="${meta.description}">
						<meta name="keywords" content="${meta.keywords}">
						<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
						<meta name="viewport" content="width=device-width, initial-scale=1">
						<style>${commonCss+[...css].join('').replace(/\n|\t/g,'')}</style>
						</head>
						<body>
						<div id="root">${body}</div>
						<script>window.REDUX_DATA = ${JSON.stringify(PostStore.getState())}</script>
						</body>
					</html>`;
				res.status(200).send(html);
			} );
		
		});
        
	})

} 