import 'bootstrap';
import 'bootstrap/css/bootstrap.css!';

export class App {
  configureRouter(config, router) {
    config.title = 'Fun Link Manager';
    config.map([
      { route: 'digests',  moduleId: './welcome', nav: true, title:'Digests' },
      { route: 'backlog',  moduleId: './backlog', nav: true, title:'Link Backlog' },
      { route: 'endpoints',  moduleId: './endpoints/list', nav: true, title:'Remote Endpoints' },
      { route: '', redirect: 'digests' }
    ]);

    this.router = router;
  }
}
