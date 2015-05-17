import DigestProvider from './provider';
import DigestState from './state';

export class DigestEdit {
  static inject = [DigestProvider, DigestState];
  digest = void 0;
  digestVm = {
    date: '',
    intro: '',
    links: []
  };

  constructor(digests, current) {
    this.digests = digests;
    this.current = current;
  }

  save() {
    this.digests.saveFrom(this.digestVm, this.digest).catch(err => {
      window.console.warn('Error adding digest:', err);
    });
  }

  activate(params) {
    console.log('activate', this.current.id);
    if (this.current.id) {
      return this.digests.get(this.current.id).then(d => {
        this.digest = d;
        this.digestVm.date = d.date;
        this.digestVm.intro = d.intro;
        this.digestVm.links = d.links;
      });
    } else {
      this.digest = {
        links: []
      }
    }
  }
}