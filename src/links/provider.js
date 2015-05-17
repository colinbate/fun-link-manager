import Resource from '../common/resource';
import Link from './model';

export default class LinkProvider extends Resource {
  constructor() {
    super('links-test2', Link);
  }
}