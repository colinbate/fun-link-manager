import PouchDb from 'pouchdb';

export default class Resource {
  constructor(dbname, defaultFac) {
    defaultFac = defaultFac || function () { return {}; };
    window.PouchDb = PouchDb;
    this.db = new PouchDb(dbname);
    this.defaultFac = defaultFac;
  }
  getAll(remap = true) {
    return this.db.allDocs({include_docs: true, descending: true}).then(res => {
      if (remap) {
        return res.rows.map(r => r.doc);
      } else {
        return res.rows;
      }
    });
  }
  get(id) {
    return this.db.get(id).catch(err => {
      if (err.status === 404) {
        return this.defaultFac(id);
      } else {
        throw err;
      }
    });
  }
  save(doc) {
    let modTime = (new Date()).toJSON();
    if (!doc.hasOwnProperty('added')) {
      doc.added = modTime;
    }
    if (!doc.hasOwnProperty('_id')) {
      doc._id = modTime;
    }
    doc.saved = modTime;
    let meta = doc._;
    delete doc._;
    return this.db.put(doc).then(res => {
      doc._ = meta;
      if (res.ok) {
        res.doc = doc;
      }
      return res;
    });
  }
  remove(doc) {
    return this.db.remove(doc);
  }
  empty() {
    return this.defaultFac();
  }
  saveFrom(vm, into) {
    into = into || this.empty();
    for (let prop in vm) {
      if (vm.hasOwnProperty(prop) &&
        into.hasOwnProperty(prop) &&
        typeof (vm[prop]) !== 'function') {
        into[prop] = vm[prop];
      }
    }
    return this.save(into);
  }
  subscribe(cb) {
    if (typeof (cb) !== 'function') {
      throw new Error('Callback must be a function');
    }
    let watcher = this.db.changes({
      since: 'now',
      live: true
    });
    watcher.addListener('change', cb);
    return function () {
      watcher.removeListener('change', cb);
    };
  }
}