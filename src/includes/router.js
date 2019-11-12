import createHomePage from 'src/routes/home';

/**
* A class that deals with routing.
*/
export default function Router(app){
	
	this.app = app;
	
	/**
	* Renders page according to the route.
	*/
	this.createPage = function(route){

		switch(route){

			case '/': 
				createHomePage(app,route); 
				break;
				
			default: 
				//404 Page 
				break;

		}

	}
	
}
