import config from './config.js';

import http from 'http';
import https from 'https';
import tls from 'tls';
import fs from 'fs';
import path from 'path';
import express from 'express';

import React from 'react';
import ReactDOM from 'react-dom';
import { renderToString } from "react-dom/server";

import { CombinedProvider, css } from 'src/includes/combinedProvider';
import { commonCss } from 'src/includes/commonCss';

import HomeStore, { initHomeStoreData } from 'src/templates/home/homeStore';
import Home from 'src/templates/home/home';

const app = express();


//Only the prod site does https redirections.
if(config.env === 'prod'){
	
	//http to https, nonwww to www redirections:
	app.use(function (req, res, next) {
		if (req.protocol === 'https' && req.headers.host.slice(0, 4) === 'www.') {
			next();
		} else {
			res.redirect(301, 'https://www.369nyc.com' + req.url);
			return;
		}
	})
	
}

// Static folders and files: 
app.use('/public', express.static(path.join(__dirname, config.root_dir + 'public')));
app.use('/dist', express.static(path.join(__dirname, config.root_dir + 'dist')));
app.use('/.well-known', express.static(path.join(__dirname, config.root_dir + 'well-known')));

/*** Application layer configurations ***/

// Home page:
app.get('/', function (req, res) {
	//Fetch Data:
    initHomeStoreData().then( () => {
        //Render HTML:
        const body = renderToString(
                <CombinedProvider store={HomeStore}>
                    <Home />
                </CombinedProvider>
            );
        const html = `<!doctype html>
    		<html>
    			<head>
    			<title>369纽约交友网</title>
				<meta name="description" content="369纽约交友网帮助纽约年轻男女提供婚介,普通交朋友,找男朋友,找女朋友,谈恋爱的平台,主要针对纽约市,法拉盛,曼哈顿和布碌伦等地区,提倡健康交友,不允许不良的行为...">
				<meta name="keywords" content="纽约婚介,纽约交友,纽约交朋友,纽约找男朋友,法拉盛交友">
    			<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    			<meta name="viewport" content="width=device-width, initial-scale=1">
    			<style>${commonCss+[...css].join('').replace(/\n|\t/g,'')}</style>
    			</head>
    			<body>
    			<div id="root">${body}</div>
                <script>window.REDUX_DATA = ${JSON.stringify(HomeStore.getState())}</script>
                <script src="./dist/home.js"></script>
    			</body>
    		</html>`;
        res.status(200).send(html);
    });
})

/*** Server layer configurations ***/

//Only the prod site runs SSL
if(config.env === 'prod'){
	
	// Certificate with www:
	const privateKey_www = fs.readFileSync('/etc/letsencrypt/live/www.369nyc.com/privkey.pem', 'utf8');
	const certificate_www = fs.readFileSync('/etc/letsencrypt/live/www.369nyc.com/cert.pem', 'utf8');
	const ca_www = fs.readFileSync('/etc/letsencrypt/live/www.369nyc.com/chain.pem', 'utf8');

	// Certificate without www:
	const privateKey_nonwww = fs.readFileSync('/etc/letsencrypt/live/369nyc.com/privkey.pem', 'utf8');
	const certificate_nonwww = fs.readFileSync('/etc/letsencrypt/live/369nyc.com/cert.pem', 'utf8');
	const ca_nonwww = fs.readFileSync('/etc/letsencrypt/live/369nyc.com/chain.pem', 'utf8');

	// Conditionally load certifate:
	const credentials = {
		SNICallback: function (domain, cb) {
			if (domain === 'www.369nyc.com') {
				return cb(null, tls.createSecureContext({
					key: privateKey_www,
					cert: certificate_www,
					ca: ca_www
				}));
			}
			else if (domain === '369nyc.com') {
				return cb(null, tls.createSecureContext({
					key: privateKey_nonwww,
					cert: certificate_nonwww,
					ca: ca_nonwww
				}));
			}
		},
	};

	// Starting https server
	const httpsServer = https.createServer(credentials, app);

	httpsServer.listen(443, () => {
		console.log('HTTPS Server running on port 443');
	});

}

// Starting http server
const httpServer = http.createServer(app);

httpServer.listen(config.port, () => {
    console.log('HTTP Server running on port ' + config.port);
});
