import Resource from '../common/resource';
import Digest from './model';

export default class DigestProvider extends Resource {
  constructor() {
    super('digests-test', Digest);
  }
}