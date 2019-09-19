import App from './app';
import React from 'react';
import ReactDOM from 'react-dom';
import { renderToString } from "react-dom/server";
import StyleContext from 'isomorphic-style-loader/StyleContext';

import fs from 'fs';
import path from 'path';
import express from 'express';
const app = express();
const http = require('http');
const https = require('https');

//Static folders and files: 
app.use('/public', express.static(path.join(__dirname, '/var/369nyc/public')));
app.use('/.well-known', express.static(path.join(__dirname, '/var/369nyc/well-known')));

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

// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/www.369nyc.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/www.369nyc.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/www.369nyc.com/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
	console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
});
