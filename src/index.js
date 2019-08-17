import App from './app';
import React from 'react';
import ReactDOM from 'react-dom';
import { renderToString } from "react-dom/server";

import path from 'path';
import fs from 'fs';
import express from 'express';
const app = express();

app.get('/', function (req, res) {
	fs.readFile(path.resolve('./src/template.html'), 'utf8', (err, data) => {
		if (err) {
			console.error(err)
			return res.status(500).send('An error occurred')
		}
		const body = renderToString(<App />);
		res.writeHead( 200, { "Content-Type": "text/html" } );
		data = data.replace('{{TITLE}}','纽约活动网')
				   .replace('{{BODY}}',body);
		res.end(data);
	});	
})

app.listen(80, () => console.log('369NYC is listening on port 80 ...'));