import {inject} from 'aurelia-framework';
import DigestProvider from './data/digests';
import Settings from './data/settings';

let populateOpen = function () {
      return this.digests.getAll().then(allDigests => {
        let unpub = allDigests.filter(d => !d.published);
        this.areOpenDigests = !!unpub.length;
        this.openDigests = unpub;
        let active = this.openDigests.filter(d => d._id === this.settings.activeId);
        if (active.length) {
          this.setActive(active[0]);
        }
      });
    };

//@inject([DigestProvider, Settings])
export class Welcome {
  static inject = [DigestProvider, Settings];
  digestVm = {
    date: '',
    intro: '',
    links: []
  };
  activeDigest = undefined;
  areOpenDigests = false;
  openDigests = [];

  constructor(digests, settings) {
    this.digests = digests;
    this.settings = settings;
  }

  save() {
    this.digests.saveFrom(this.digestVm, this.activeDigest).then(x => {
      // this.digestVm.date = '';
      // this.digestVm.intro = '';
      // this.digestVm.links = [];
      this.activeDigest = x.doc;
      this.settings.activeId = x.id;
    }).catch(err => {
      window.console.warn('Error adding digest:', err);
    });
  }

  setActive(digest) {
    window.console.log('Setting active digest to', digest);
    this.activeDigest = digest;
    this.settings.activeId = digest._id;
    this.digestVm.date = this.activeDigest.date;
    this.digestVm.intro = this.activeDigest.intro;
    this.digestVm.links = this.activeDigest.links;
  }

  activate() {
    this.unsub = this.digests.subscribe(populateOpen.bind(this));
    return populateOpen.call(this);
  }

  deactivate() {
    if (this.unsub) {
      this.unsub();
    }
  }
}
