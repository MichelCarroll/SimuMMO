
import {Component} from './Component';

let nextGlobalId = 1;

export default class GameObject  {

  parent:GameObject;
  contents:GameObject[];
  components:Map<string, Component>;
  id:number;
  types:string[];

  constructor(types?:string[]) {
    this.contents = [];
    this.components = new Map();
    this.id = nextGlobalId++;
    this.types = types || [];
  }

  addComponent(component:Component) {
    this.components.set(component.getName(), component);
  }

  hasComponent(name:string):boolean {
    return this.components.has(name);
  }

  getComponent<T>(name:string):T {
    return <any>this.components.get(name);
  }

  getObjectTypes():string[] {
    return this.types;
  }

  isA(type:string) {
    return this.getObjectTypes().indexOf(type) !== -1;
  }

  add(object:GameObject) {
    object.setParent(this);
    this.contents.push(object);
  }

  getParent():any {
    return this.parent;
  }

  setParent(parent:GameObject) {
    this.parent = parent;
  }

  remove(object:GameObject) {
    this.contents.splice(this.contents.findIndex(function(o:GameObject) { return o.id === object.id; }), 1);
  }

  all():GameObject[] {
    return this.contents;
  }

  empty() {
    this.contents = [];
  }

  takeAll(from:GameObject) {
    from.all().forEach((go:GameObject) => {
      this.add(go);
    });
    from.empty();
  }

  allWithComponent(name:string):any {
    return this.contents.filter((object:GameObject) => object.hasComponent(name));
  }

  allOfType(type:string):any {
    return this.contents.filter((object:GameObject) => object.isA(type));
  }

  oneOfType(type:string):any {
    return this.contents.find((object:GameObject) => { return object.isA(type)});
  }

}