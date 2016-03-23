// Libraries
import {Component}         from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector    : 'navigation',
    templateUrl : 'dist/component/navigation/navigation.html',
    directives  : [ROUTER_DIRECTIVES]
})
export class NavigationComponent { }