import PouchModel from './pouch';
import Link from './link';

export default class Digest extends PouchModel {
  constructor(doc = {}) {
    super(doc);
    this.date = doc.date;
    this.intro = doc.intro;
    this.links = doc.links.map(l => new Link(l));
  }
  toJSON() {
    let doc = {
      date: this.date,
      intro: this.intro,
      links: this.links.map(l => l.toJSON())
    };
    return super.toJSON(doc);
  }
  toMarkdown() {
    let linktext = this.links.map(l => l.toMarkdown()).join('\n\n');
    return `${this.intro}

${linktext}`;
  }
}