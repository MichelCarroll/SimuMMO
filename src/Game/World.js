

import GameObject from './GameObject';
import Container from './Container';

export default class World extends GameObject {

  constructor() {
    super();
    this.locations = new Container(this);
  }

  getContainer() {
    return null;
  }

}
