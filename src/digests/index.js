import DigestState from './state';

export class DigestIndex {
  static inject = [DigestState];
  constructor(current) {
    this.current = current;
  }

  configureRouter(config, router) {
    config.map([
      { route: '',         moduleId: './view',     nav: true, title: 'View' },
      { route: 'edit',     moduleId: './edit',     nav: true, title: 'Edit' },
      { route: 'markdown', moduleId: './markdown', nav: true, title: 'View As Markdown' }
    ]);

    this.router = router;
  }

  activate(params) {
    console.log('Digest:', params);
    this.current.id = params.id;
  }
}