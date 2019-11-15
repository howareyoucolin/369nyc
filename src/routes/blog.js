import path from 'path';
import axios from 'axios';

import React from 'react';
import ReactDOM from 'react-dom';
import { renderToString } from "react-dom/server";

import { CombinedProvider, css } from 'src/includes/combinedProvider';
import { commonCss } from 'src/includes/commonCss';

import BlogStore, { initBlogStoreData } from 'src/templates/blog/blogStore';
import Blog from 'src/templates/blog/blog';

export default function(app,route){

	app.get(route, function (req, res) {

		//Fetch Data:
	    initBlogStoreData().then( () => {
		
			//Render HTML:
			const body = renderToString(
					<CombinedProvider store={BlogStore}>
						<Blog />
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
						<script>window.REDUX_DATA = ${JSON.stringify(BlogStore.getState())}</script>
						<script src="./dist/blog.js"></script>
						</body>
					</html>`;
				res.status(200).send(html);
			} );
		
		});
        
	})

} 