import {inject} from 'aurelia-framework';
import LinkProvider from './data/links';

let populate = function () {
  return this.links.getAll().then(allLinks => {
    this.backlog = allLinks;
  });
};

@inject(LinkProvider)
export class Backlog {
  heading = 'Link Backlog';
  backlog = [];
  addLinkState = 'closed';
  linkVm = {
    name: '',
    url: '',
    description: ''
  };

  constructor(links) {
    this.links = links;
  }

  save() {
    this.links.saveFrom(this.linkVm).then(x => {
      this.linkVm.name = '';
      this.linkVm.url = '';
      this.linkVm.description = '';  
    }).catch(err => {
      window.console.warn('Error adding link:', err);
    });
  }

  openForm() {
    this.addLinkState = 'open';
  }
  closeForm() {
    this.addLinkState = 'closed';
  }

  activate() {
    this.unsub = this.links.subscribe(populate.bind(this));
    return populate.call(this);
  }

  deactivate() {
    if (this.unsub) {
      this.unsub();
    }
  }
}
