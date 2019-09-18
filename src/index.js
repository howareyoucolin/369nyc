import App from './app';
import React from 'react';
import ReactDOM from 'react-dom';
import { renderToString } from "react-dom/server";
import StyleContext from 'isomorphic-style-loader/StyleContext';

import path from 'path';
import express from 'express';
const app = express();

app.get('/', function (req, res) {
	//Init Isomorphic Styles:
	const css = new Set();
	const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()));
	//Render HTML:
	const body = renderToString(<StyleContext.Provider value={{ insertCss }}><App /></StyleContext.Provider>);
	const html = `<!doctype html>
		<html>
			<head>
			<title>369nyc Event Site</title>
			<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<style>${[...css].join('')}</style>
			</head>
			<body>
			<div id="root">${body}</div>
			</body>
		</html>`;
	res.status(200).send(html);
})

app.listen(80, () => console.log('369NYC is listening on port 80 ...'));