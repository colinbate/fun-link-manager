import DigestProvider from './provider';
import DigestState from './state';

export class DigestView {
  static inject = [DigestProvider, DigestState];
  digest = void 0;

  constructor(digests, current) {
    this.digests = digests;
    this.current = current;
  }

  activate(params) {
    console.log('activate', this.current.id);
    if (this.current.id) {
      return this.digests.get(this.current.id).then(d => {
        this.digest = d;
      });
    } else {
      this.digest = {
        links: []
      }
    }
  }
}