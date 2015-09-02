import DigestProvider from './provider';
import DigestState from './state';
import EndpointProvider from '../endpoints/provider';
import {AlertCentre} from '../common/alert-centre';

let getHeaders = function (target) {
  let extraHeaders = [];
  if (!target) {
    return '';
  }
  if (target.date) {
    extraHeaders.push(`date = ${target.date}`);
  }
  if (target.id) {
    extraHeaders.push(`postid = ${target.id}`);
  }
  return extraHeaders.length ? '\n' + extraHeaders.join('\n') : '';
};

let joinUrl = function (target, path) {
  let newUrl;
  if (target.url[target.url.length - 1] === '/') {
    if (path[0] === '/') {
      newUrl = target.url + path.substr(1);
    } else {
      newUrl = target.url + path;
    }
  } else {
    if (path[0] === '/') {
      newUrl = target.url + path;
    } else {
      newUrl = target.url + '/' + path;
    }
  }
  return {
    url: newUrl
  };
}

export class DigestMarkdown {
  static inject = [DigestProvider, DigestState, EndpointProvider, AlertCentre];
  digest = void 0;

  constructor(digests, current, endpoints, alert) {
    this.digests = digests;
    this.current = current;
    this.endpoints = endpoints;
    this.alert = alert;
  }

  getMarkdownFor(target) {
    let d = this.digest;
    
    let header = `+++
title = "Fun Links ${d.date}"
categories = ["Fun Links"]${getHeaders(target)}
+++`;
    let linkList = d.links.map(l => l.toMarkdown()).join('\n\n');
    let payload = `${d.intro}

${linkList}`;
    return header + '\n' + payload;
  }

  post(target) {
    let url = joinUrl(target, target.id ? '/edit' : '/new');
    this.alert.info('Sending request to ' + url.url, 'digest-markdown');
    this.endpoints.sendTo(url, this.getMarkdownFor(target)).then(p => {
      target.date = p.date;
      target.id = p.id;
    }).catch(err => {
      this.alert.danger('Error: ' + err);
    });
  }

  activate(params) {
    console.log('activate', this.current.id);
    if (this.current.id) {
      return Promise.all([
        this.digests.get(this.current.id),
        this.endpoints.getAll()
      ]).then(res => {
        let [digest, endp] = res;
        this.digest = digest;
        digest.targets = endp.map(e => {
          let pub = (digest.published || []).find(d => d.where === e.name) || {};
          return {
            name: e.name,
            url: e.url,
            date: pub.date,
            id: pub.id,
            action: pub.id ? 'Update' : 'Publish'
          };
        });
      });
    } else {
      this.digest = {
        links: []
      }
    }
  }
}