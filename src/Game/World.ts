

import GameObject from './GameObject';
import Container from './Container';

export default class World extends GameObject {

  locations:Container;

  constructor() {
    super();
    this.locations = new Container(this);
  }

  getContainer():GameObject {
    return null;
  }

}
