import Resource from './resource';
import Link from '../models/link';

export default class LinkProvider extends Resource {
  constructor() {
    super('links-test2', Link);
  }
}