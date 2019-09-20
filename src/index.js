import Home from './home';
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
const tls = require('tls');

//http to https, nonwww to www redirections:
app.use(function (req, res, next) {
    if (req.protocol === 'https' && req.headers.host.slice(0, 4) === 'www.') {
        next();
    } else {
        res.redirect(301, 'https://www.369nyc.com' + req.url);
        return;
    }
})

// Static folders and files: 
app.use('/public', express.static(path.join(__dirname, '/var/369nyc/public')));
app.use('/.well-known', express.static(path.join(__dirname, '/var/369nyc/well-known')));

// Home page:
app.get('/', function (req, res) {
    //Init Isomorphic Styles:
    const css = new Set();
    const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()));
    //Render HTML:
    const body = renderToString(<StyleContext.Provider value={{ insertCss }}><Home /></StyleContext.Provider>);
    const html = `<!doctype html>
		<html>
			<head>
			<title>369纽约活动网</title>
			<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<style>body{margin:85px 0 0;padding:0;font-family:Georgia,"Times New Roman","KaiTi","楷体",STKaiti,"华文楷体",serif;line-height:27px;font-size:15px;color:#474747;}${[...css].join('').replace(/\n|\t/g,'')}</style>
			</head>
			<body>
			<div id="root">${body}</div>
			</body>
		</html>`;
    res.status(200).send(html);
})

// Certificate with www:
const privateKey = fs.readFileSync('/etc/letsencrypt/live/www.369nyc.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/www.369nyc.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/www.369nyc.com/chain.pem', 'utf8');
// Certificate without www:
const privateKey2 = fs.readFileSync('/etc/letsencrypt/live/369nyc.com/privkey.pem', 'utf8');
const certificate2 = fs.readFileSync('/etc/letsencrypt/live/369nyc.com/cert.pem', 'utf8');
const ca2 = fs.readFileSync('/etc/letsencrypt/live/369nyc.com/chain.pem', 'utf8');

// Conditionally load certifate:
const credentials = {
    SNICallback: function (domain, cb) {
        if (domain === 'www.369nyc.com') {
            return cb(null, tls.createSecureContext({
                key: privateKey,
                cert: certificate,
                ca: ca
            }));
        }
        else if (domain === '369nyc.com') {
            return cb(null, tls.createSecureContext({
                key: privateKey2,
                cert: certificate2,
                ca: ca2
            }));
        }
    },

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
