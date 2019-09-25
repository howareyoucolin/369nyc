import React from 'react';
import ReactDOM from 'react-dom';
import { renderToString } from "react-dom/server";
import StyleContext from 'isomorphic-style-loader/StyleContext';
import { combineReducers, createStore } from 'redux';
import postReducer from "src/store/postData/reducer";
import { Provider } from "react-redux";

import fs from 'fs';
import path from 'path';
import express from 'express';

import Home from 'src/templates/Home/Home';

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
app.use('/dist', express.static(path.join(__dirname, '/var/369nyc/dist')));
app.use('/.well-known', express.static(path.join(__dirname, '/var/369nyc/well-known')));

// Home page:
app.get('/', function (req, res) {
    //Init Isomorphic Styles:
    const css = new Set();
    const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()));
    //Redux store:
    const combinedReducer = combineReducers({
        postData: postReducer
    });
    const store = createStore(combinedReducer);
	//Fetch Data:
	store.dispatch({type: 'FETCH_POSTS'});
    //Render HTML:
    const body = renderToString(
            <Provider store={store}>
            <StyleContext.Provider value={{ insertCss }}><Home /></StyleContext.Provider>
            </Provider>
        );
    const html = `<!doctype html>
		<html>
			<head>
			<title>369纽约活动网</title>
			<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<style>body{margin:85px 0 0;padding:0;font-family:Georgia,"Times New Roman","Microsoft YaHei New", "Microsoft Yahei","微软雅黑",宋体,SimSun,STXihei,"华文细黑",sans-serif;line-height:28px;font-size:16px;color:#676767;}${[...css].join('').replace(/\n|\t/g,'')}</style>
			</head>
			<body>
			<div id="root">${body}</div>
            <script src="./dist/home.js"></script>
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
