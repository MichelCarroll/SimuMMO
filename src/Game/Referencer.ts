
import GameObject from './GameObject';

export default class Referencer extends GameObject {

    add(object:GameObject) {
      this.contents.push(object);
    }
    
}
