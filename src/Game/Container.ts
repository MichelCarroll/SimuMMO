
import GameObject from './GameObject';

export default class Container {

  isWeak:boolean;
  parent:Container;
  contents:GameObject[];

  constructor(container?:Container, isWeak?:boolean) {
    this.isWeak = !!isWeak;
    this.parent = container;
    this.contents = [];
  }

  add(object:GameObject) {
    if(!this.isWeak) {
        object.setParent(this);
    }
    this.contents.push(object);
  }

  getParent():any {
    return this.parent;
  }

  setParent(container:Container) {
    this.parent = container;
  }

  remove(object:GameObject) {
    this.contents.splice(this.contents.findIndex(function(o:GameObject) { return o.id === object.id; }), 1);
  }

  all():Container[] {
    return this.contents;
  }

  empty() {
    this.contents = [];
  }

  takeAll(otherContainer:Container) {
    otherContainer.all().forEach((go:GameObject) => {
      this.add(go);
    });
    otherContainer.empty();
  }

  oneOfType(type:string):any {
    return this.contents.find((object:GameObject) => object.isA(type));
  }

}
