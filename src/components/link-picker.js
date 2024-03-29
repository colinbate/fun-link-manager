import {bindable, inject} from 'aurelia-framework';
import LinkProvider from '../links/provider';

@inject(LinkProvider)
@bindable({
  name: 'selectedLinks',
  defaultBindingMode: 2
})
export class LinkPickerCustomElement {
  editMode = false;
  showEditBtn = true;
  allLinks = [];

  constructor(linkSvc) {
    this.linkSvc = linkSvc;
  }

  editLinks() {
    this.linkSvc.getAll().then(links => {
      this.allLinks = links.filter(l => !l.pending);
      this.editMode = true;
      this.showEditBtn = false;
    });
  }

  pick(link) {
    link.pending = true;
    this.linkSvc.save(link).then(res => {
      this.selectedLinks.push(link);
      let ai = this.allLinks.indexOf(link);
      this.allLinks.splice(ai, 1);
    });
  }

  done() {
    this.editMode = false;
    this.showEditBtn = true;
  }
}