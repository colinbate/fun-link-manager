import {inject} from 'aurelia-framework';
import EndpointProvider from './provider';

let populate = function () {
  return this.endpoints.getAll().then(all => {
    this.list = all;
  });
};

@inject(EndpointProvider)
export class EndpointList {
  heading = 'Remote Endpoints';
  list = [];
  addState = 'closed';
  editState = {};
  endpointVm = {
    name: '',
    url: ''
  };

  constructor(endpoints) {
    this.endpoints = endpoints;
  }

  saveNew() {
    this.endpoints.saveFrom(this.endpointVm).then(x => {
      this.endpointVm.name = '';
      this.endpointVm.url = '';
    }).catch(err => {
      window.console.warn('Error adding endpoint:', err);
    });
  }

  edit(item) {
    if (!item.editing) {
      item.editing = true;
      item.showSave = true;
      item.former = {
        name: item.name,
        url: item.url,
      };
    }
  }

  saveEdit(item) {
    if (!item.saving) {
      // Save
      item.saving = true;
      item.showSave = false;
      this.endpoints.save(item).then(r => {
        item.saving = false;
        item.editing = false;
        delete item.former;
      });
    }
  }

  cancelEdit(item) {
    if (item.editing) {
      item.name = item.former.name;
      item.url = item.former.url;
      delete item.former;
      item.editing = false;
      item.showSave = false;
    }
  }

  openForm() {
    this.addState = 'open';
  }
  closeForm() {
    this.addState = 'closed';
  }

  activate() {
    this.unsub = this.endpoints.subscribe(populate.bind(this));
    return populate.call(this);
  }

  deactivate() {
    if (this.unsub) {
      this.unsub();
    }
  }
}
