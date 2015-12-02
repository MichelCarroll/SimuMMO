
import {Component} from './Component';
import {Event} from './Event';

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

  toString():string {
    return `#${this.id} ${this.types.join(',')}`;
  }

  getComponentsDescribe():Object {
    let ret = {};
    this.components.forEach((component:Component, key:string) => {
      ret[key] = component.describe()
    });
    return ret;
  }

  describe():Object {
    return {
      id: this.id,
      types: this.types.join(' '),
      components: this.getComponentsDescribe(),
      contents: this.contents.map((content:GameObject) => content.toString())
    }
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

  getParent():GameObject {
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

  trigger(event:Event) {
    this.components.forEach((component:Component) => component.onEvent(event));
    switch(event.getName()) {
      case 'Death':
        break;
    }
  }

  oneWithComponent(name:string):any {
    return this.contents.find((object:GameObject) => object.hasComponent(name));
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
