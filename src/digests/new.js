import DigestProvider from './provider';

export class DigestNew {
  static inject = [DigestProvider];
  digestVm = {
    date: '',
    intro: '',
    links: []
  };

  constructor(digests) {
    this.digests = digests;
  }
}