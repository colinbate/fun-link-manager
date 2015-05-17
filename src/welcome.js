import DigestProvider from './digests/provider';
import Settings from './data/settings';
import DigestState from './digests/state';

let populateOpen = function () {
      return this.digests.getAll().then(allDigests => {
        let unpub = allDigests.filter(d => !d.published);
        this.openDigests = unpub;
        // let active = this.openDigests.filter(d => d._id === this.settings.activeId);
        // if (active.length) {
        //   this.setActive(active[0]);
        // }
      });
    };

//@inject([DigestProvider, Settings])
export class Welcome {
  static inject = [DigestProvider, Settings, DigestState];
  
  activeDigest = undefined;
  openDigests = [];
  showViewer = false;
  preview = '';

  constructor(digests, settings, current) {
    this.digests = digests;
    this.settings = settings;
    this.current = current;
  }

  configureRouter(config, router) {
    config.map([
      { route: '',    moduleId: './digests/new',   nav: false, name: 'newDigest' },
      { route: ':id', moduleId: './digests/index', nav: false, name: 'singleDigest' }
    ]);
    this.router = router;
  }

  // setActive(digest) {
  //   window.console.log('Setting active digest to', digest);
  //   this.activeDigest = digest;
  //   this.settings.activeId = digest._id;
  //   this.digestVm.date = this.activeDigest.date;
  //   this.digestVm.intro = this.activeDigest.intro;
  //   this.digestVm.links = this.activeDigest.links;
  // }

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
