import createHomePage from 'src/routes/home';
import createBlogPage from 'src/routes/blog';

/**
* A class that deals with routing.
*/
export default function Router(app){
	
	this.app = app;
	
	/**
	* Renders page according to the route.
	*/
	this.createPages = function(){

		//Home page:
		createHomePage(app, '/'); 
		
		//Blog page:
		createBlogPage(app, '/blog'); 
		
		//404 page
		//TODO

	}
	
}
