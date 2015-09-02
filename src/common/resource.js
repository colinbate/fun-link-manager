import PouchDb from 'pouchdb';

let syncOpts = {
  live: true,
  retry: true
};

let consoleLogger = function (name) {
  return function (x) {
    if (window.console) {
      window.console.log(name, x);
    }
  };
};


export default class Resource {
  constructor(dbname, ModelType) {
    //window.PouchDb = PouchDb;
    this.db = new PouchDb(dbname);
    this._remote = new PouchDb('http://funlinks.iriscouch.com/' + dbname);
    this.ModelType = ModelType;

    this.db.sync(this._remote, syncOpts)
      .on('change', consoleLogger('CHANGE'))
      .on('paused', consoleLogger('PAUSED'))
      .on('active', consoleLogger('ACTIVE'))
      .on('error', consoleLogger('ERROR'));
  }
  getAll(remap = true) {
    return this.db.allDocs({include_docs: true, descending: true}).then(res => {
      if (remap) {
        return res.rows.map(r => new this.ModelType(r.doc));
      } else {
        return res.rows;
      }
    });
  }
  get(id) {
    return this.db.get(id).then(doc => {
      return new this.ModelType(doc);
    }).catch(err => {
      if (err.status === 404) {
        return new this.ModelType(id);
      } else {
        throw err;
      }
    });
  }
  save(model) {
    model.touch();
    let doc = model.toJSON();
    return this.db.put(doc).then(res => {
      if (res.ok) {
        model._rev = res.rev;
      }
      return res;
    });
  }
  remove(model) {
    return this.db.remove(model.toJSON());
  }
  empty() {
    return new this.ModelType();
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