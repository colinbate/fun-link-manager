import PouchModel from '../common/pouch-model';

export default class Link extends PouchModel {
  constructor(doc = {}) {
    super(doc);
    this.name = doc.name;
    this.url = doc.url;
    this.description = doc.description;
    this.pending = doc.pending;
    this.tags = doc.tags;
  }
  toJSON() {
    let doc = {
      name: this.name,
      url: this.url,
      description: this.description,
      pending: this.pending,
      tags: this.tags
    };
    return super.toJSON(doc);
  }

  toMarkdown() {
    return `**${this.name}**  
${this.url}  
${this.description}`;
  }
}