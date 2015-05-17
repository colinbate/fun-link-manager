import Resource from '../common/resource';
import Endpoint from './model';

export default class EndpointProvider extends Resource {
  constructor() {
    super('endpoints-test', Endpoint);
  }
}