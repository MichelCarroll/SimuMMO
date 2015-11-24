
import GameObject from './GameObject';

export default class Container {

  isWeak:boolean;
  container:GameObject;
  contents:GameObject[];

  constructor(container:GameObject, isWeak?:boolean) {
    this.isWeak = !!isWeak;
    this.container = container;
    this.contents = [];
  }

  add(object:GameObject) {
    if(!this.isWeak) {
        object.setContainer(this.container);
    }
    this.contents.push(object);
  }

  remove(object:GameObject) {
    this.contents.splice(this.contents.findIndex(function(o:GameObject) { return o.id === object.id; }), 1);
  }

  all():GameObject[] {
    return this.contents;
  }

  oneOfType(type:string):any {
    return this.contents.find((object:GameObject) => object.isA(type));
  }

}
