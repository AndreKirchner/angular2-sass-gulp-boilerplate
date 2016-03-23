// Libraries
import {Component}                      from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

// Custom Components
import {NavigationComponent} from '../navigation/navigation';
import {HomePageComponent}   from '../page-home/page-home';
import {AboutPageComponent}  from '../page-about/page-about';

@Component({
    selector    : 'my-app',
    templateUrl : 'dist/component/app/app.html',
	directives  : [NavigationComponent, ROUTER_DIRECTIVES]
})
@RouteConfig([
	{   
		path      : '/',
		name      : 'Home',
		component : HomePageComponent
	},
	{ 
		path      : '/about',
		name      : 'About',
		component : AboutPageComponent
	}
])
export class AppComponent { }