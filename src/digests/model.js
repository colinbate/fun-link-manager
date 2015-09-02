import PouchModel from '../common/pouch-model';
import Link from '../links/model';

export default class Digest extends PouchModel {
  constructor(doc = {}) {
    super(doc);
    this.date = doc.date;
    this.intro = doc.intro;
    this.links = doc.links.map(l => new Link(l));
    this.published = doc.published;
  }
  toJSON() {
    let doc = {
      date: this.date,
      intro: this.intro,
      links: this.links.map(l => l.toJSON()),
      published: this.published
    };
    return super.toJSON(doc);
  }
  toMarkdown() {
    let linktext = this.links.map(l => l.toMarkdown()).join('\n\n');
    return `${this.intro}

${linktext}`;
  }

}