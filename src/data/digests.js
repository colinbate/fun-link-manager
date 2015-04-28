import Resource from './resource';

export default class DigestProvider extends Resource {
  constructor() {
    super('digests-test', () => {
      return {
        date: null,
        intro: null,
        links: []
      };
    });
  }
}