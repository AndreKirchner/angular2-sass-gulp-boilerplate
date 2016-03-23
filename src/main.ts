// Libraries
import {bootstrap}        from 'angular2/platform/browser'
import {ROUTER_PROVIDERS} from 'angular2/router';

// Custom Components
import {AppComponent}     from './component/app/app'

bootstrap(AppComponent, [
	ROUTER_PROVIDERS
]);