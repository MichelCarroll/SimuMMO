
import GameObject from '../GameObject';
import {Component} from '../Component';

export default class Referencer  extends GameObject implements Component {

    add(object:GameObject) {
      this.contents.push(object);
    }

    getName():string {
      return 'referencer';
    }
}
