import {bindable, inject} from 'aurelia-framework';
import LinkProvider from '../data/links';

@inject(LinkProvider)
@bindable({
  name: 'selectedLinks',
  defaultBindingMode: 2
})
export class LinkPickerCustomElement {
  showPicker = false;
  showAddBtn = true;
  allLinks = [];

  constructor(linkSvc) {
    this.linkSvc = linkSvc;
  }

  addLinks() {
    this.linkSvc.getAll().then(links => {
      this.allLinks = links.filter(l => !l.pending);
      this.showPicker = true;
      this.showAddBtn = false;
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
    this.showPicker = false;
    this.showAddBtn = true;
  }
}