import path from 'path';
import express from 'express';

import config from 'src/config.js';
import Server from 'src/includes/server.js';

import React from 'react';
import ReactDOM from 'react-dom';
import { renderToString } from "react-dom/server";

import { CombinedProvider, css } from 'src/includes/combinedProvider';
import { commonCss } from 'src/includes/commonCss';

import HomeStore, { initHomeStoreData } from 'src/templates/home/homeStore';
import Home from 'src/templates/home/home';

const app = express();
const server = new Server(app);

//http to https, nonwww to www redirections:
server.setServerRedirect();

// Static folders and files: 
app.use('/public', express.static(path.resolve('./') + '/public'));
app.use('/dist', express.static(path.resolve('./') + '/dist'));
app.use('/.well-known', express.static(path.resolve('./') + '/well-known'));

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

//Start http and https server
server.loadHttpServer().loadHttpsServer();
