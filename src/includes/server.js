import http from 'http';
import https from 'https';
import tls from 'tls';
import fs from 'fs';

import config from 'src/config.js';

/**
* A class that deals with the server settings.
*/
const Server = function(app){
	
	this.app = app;
	
	/**
	* http to https, nonwww to www redirections:
	*/
	this.setServerRedirect = function(){
		
		//Only the prod site makes such redirects.
		if(config.env !== 'prod') return this;
		
		this.app.use(function (req, res, next) {
			if (req.protocol === 'https' && req.headers.host.slice(0, 4) === 'www.') {
				next();
			} else {
				res.redirect(301, 'https://www.369nyc.com' + req.url);
				return this;
			}
		})
		
	}
	
	/**
	* Start a http server
	*/
	this.loadHttpServer = function(){
		
		const httpServer = http.createServer(this.app);

		httpServer.listen(config.port, () => {
			console.log('HTTP Server running on port ' + config.port);
		});
		
		return this;

	}
	
	/**
	* Start a https server
	*/
	this.loadHttpsServer = function(){
		
		//Only the prod site runs SSL.
		if(config.env !== 'prod') return this;
		
		/*** NOTE ***/
		// How to obtain a ssl certificate?
		// https://itnext.io/node-express-letsencrypt-generate-a-free-ssl-certificate-and-run-an-https-server-in-5-minutes-a730fbe528ca

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
		const httpsServer = https.createServer(credentials, this.app);

		httpsServer.listen(443, () => {
			console.log('HTTPS Server running on port 443');
		});

		return this;
		
	}
	
}

export default Server;