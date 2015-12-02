
import GameObject from '../../Common/GameObject';
import {Component} from '../../Common/Component';
import {Event} from '../../Common/Event';

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

    onEvent(event:Event) {

    }
}
