export default class PouchModel {
  constructor(doc = {}) {
    if (typeof (doc) === 'string') {
      this._id = doc;
    } else {
      this._id = doc._id;
      this._rev = doc._rev;
      this.added = doc.added;
      this.saved = doc.saved;
    }
  }

  toJSON(initial = {}) {
    initial._id = this._id;
    initial._rev = this._rev;
    initial.added = this.added;
    initial.saved = this.saved;
    return initial;
  }

  // isValid() {}

  touch() {
    let modTime = (new Date()).toJSON();
    if (!this.added) {
      this.added = modTime;
    }
    if (!this._id) {
      this._id = modTime;
    }
    this.saved = modTime;
  }

  isNew() {
    return !this._rev;
  }
}