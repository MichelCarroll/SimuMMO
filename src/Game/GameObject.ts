

let nextGlobalId = 1;

export default class GameObject {

  id:number;
  types:string[];
  container:GameObject;

  constructor(types?:string[]) {
    this.id = nextGlobalId++;
    this.types = types || [];
  }

  getContainer():any {
    return this.container;
  }

  setContainer(container:GameObject) {
    this.container = container;
  } 

  getObjectTypes():string[] {
    return this.types;
  }

  isA(type:string) {
    return this.getObjectTypes().indexOf(type) !== -1;
  }

}
