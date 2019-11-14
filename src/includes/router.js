import createHomePage from 'src/routes/home';
import createPostArchivePage from 'src/routes/posts';
import createPostSinglePage from 'src/routes/post';

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

			case '/blog': 
				createPostArchivePage(app,route); 
				break;
				
			case '/post': 
				createPostSinglePage(app,route); 
				break;
				
				
			default: 
				//404 Page 
				break;

		}

	}
	
}
