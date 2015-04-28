import storeFac from './local-store';

let save = function () {
  this.store(this.settings);
};

export default class Settings {
  constructor() {
    this.store = storeFac('settings');
    this.settings = this.store() || {} ;
  }

  get activeId ()  { return this.settings.activeId; }
  set activeId (v) { this.settings.activeId = v; save.call(this); }
}