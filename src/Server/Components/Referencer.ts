
import GameObject from '../../Common/GameObject';
import {Component} from '../../Common/Component';

export default class Referencer  extends GameObject implements Component {

    add(object:GameObject) {
      this.contents.push(object);
    }

    getName():string {
      return 'referencer';
    }

    describe():Object {
        return {}
    }
}
