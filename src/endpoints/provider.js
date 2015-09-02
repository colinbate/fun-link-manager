import Resource from '../common/resource';
import Endpoint from './model';
import {HttpClient} from 'aurelia-http-client';

export default class EndpointProvider extends Resource {
  static inject = [HttpClient];
  constructor(http) {
    super('endpoints-test', Endpoint);
    this.http = http;
  }

  sendTo(endp, data) {
    return this.http.post(endp.url, data);
  }
}