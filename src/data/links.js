import Resource from './resource';

export default class LinkProvider extends Resource {
  constructor() {
    super('links-test2', () => {
      return {
        name: null,
        url: null,
        description: null,
        tags: []
      };
    });
  }
}