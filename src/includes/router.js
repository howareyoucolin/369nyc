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
	this.createPages = function(){

		//Home page:
		createHomePage(app, '/'); 
		
		//Posts archive page and single page:
		createPostArchivePage(app, '/blog'); 
		//createPostSinglePage(app, 'post'); 
		
		//404 page
		//TODO

	}
	
}
