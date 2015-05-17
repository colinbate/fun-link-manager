import PouchModel from '../common/pouch-model';

export default class Endpoint extends PouchModel {
  constructor(doc = {}) {
    super(doc);
    this.name = doc.name;
    this.url = doc.url;
    this.type = doc.type || 'toml+md';
  }
  toJSON() {
    let doc = {
      name: this.name,
      url: this.url,
      type: this.type || 'toml+md',
    };
    return super.toJSON(doc);
  }
}