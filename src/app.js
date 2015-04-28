import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import 'bootstrap';
import 'bootstrap/css/bootstrap.css!';

@inject(Router)
export class App {
  constructor(router) {
    this.router = router;
    this.router.configure(config => {
      config.title = 'Fun Link Manager';
      config.map([
        { route: ['','welcome'],  moduleId: './welcome',      nav: true, title:'Create Digest' },
        { route: 'backlog',       moduleId: './backlog',      nav: true, title:'Link Backlog' },
        { route: 'child-router',  moduleId: './child-router', nav: true, title:'Published Digests' }
      ]);
    });
  }
}
