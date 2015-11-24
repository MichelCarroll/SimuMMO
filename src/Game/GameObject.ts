

let nextGlobalId = 1;

export default class GameObject {

  id:number;
  container:GameObject;

  constructor() {
    this.id = nextGlobalId++;
  }

  getContainer():any {
    return this.container;
  }

  setContainer(container:GameObject) {
    this.container = container;
  }

  getObjectTypes():string[] {
    return [];
  }

  isA(type:string) {
    return this.getObjectTypes().indexOf(type) !== -1;
  }

}
