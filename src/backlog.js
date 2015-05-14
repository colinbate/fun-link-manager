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
  editState = {};
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

  unlock(link) {
    delete link.pending;
    this.links.save(link);
  }

  edit(link) {
    if (!link.editing) {
      link.editing = true;
      link.showSave = true;
      link.former = {
        name: link.name,
        url: link.url,
        description: link.description
      };
    }
  }

  saveEdit(link) {
    if (!link.saving) {
      // Save
      link.saving = true;
      link.showSave = false;
      this.links.save(link).then(r => {
        link.saving = false;
        link.editing = false;
        delete link.former;
      });
    }
  }

  cancelEdit(link) {
    if (link.editing) {
      link.name = link.former.name;
      link.url = link.former.url;
      link.description = link.former.description;
      delete link.former;
      link.editing = false;
      link.showSave = false;
    }
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
