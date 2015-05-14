import Resource from './resource';
import Digest from '../models/digest';

export default class DigestProvider extends Resource {
  constructor() {
    super('digests-test', Digest);
  }
}