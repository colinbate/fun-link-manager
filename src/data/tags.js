import PouchDb from 'pouchdb';

export default class TagProvider {
  constructor() {
    this.db = new PouchDb('tags');
  }
  getAll() {
    return this.db.allDocs().then(res => {
       return res.rows.map(r => r.id);
    });
  }
  addUsage(tag) {
    return this.db.get(tag).catch(err => {
      if (err.status === 404) {
        return {
          _id: tag,
          count: 0
        };
      } else {
        throw err;
      }
    }).then(tdoc => {
      tdoc.count += 1;
      return this.db.put(tdoc);
    }).catch(err => {
      window.console.log('Data Error', err);
    });
  }
  removeUsage(tag) {
    return this.db.get(tag).then(tdoc => {
      tdoc.count -= 1;
      if (tdoc.count === 0) {
        return this.db.remove(tdoc);
      }
      return this.db.put(tdoc);
    }).catch(err => {
      window.console.log('Data Error', err);
    });
  }
}