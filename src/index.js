import path from 'path';
import express from 'express';

import config from 'src/config.js';
import Server from 'src/includes/server.js';
import Router from 'src/includes/router.js';

const app = express();
const server = new Server(app);
const router = new Router(app);

//http to https, nonwww to www redirections:
server.setServerRedirect();

// Static folders and files: 
app.use('/public', express.static(path.resolve('./') + '/public'));
app.use('/dist', express.static(path.resolve('./') + '/dist'));
app.use('/.well-known', express.static(path.resolve('./') + '/well-known'));

//Route pages
router.createPages();

//Start http and https server
server.loadHttpServer().loadHttpsServer();
