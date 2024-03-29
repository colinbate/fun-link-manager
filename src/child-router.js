import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class ChildRouter {
  heading = 'Child Router';

  constructor(router) {
    this.router = router;
    router.configure(config => {
      config.map([
        { route: ['','welcome'],  moduleId: './welcome',      nav: true, title:'Welcome' },
        { route: 'flickr',        moduleId: './flickr',       nav: true },
        { route: 'child-router',  moduleId: './child-router', nav: true, title:'Child Router' }
      ]);
    });
  }
}
