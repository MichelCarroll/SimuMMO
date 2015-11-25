
import Container from './Container';

let nextGlobalId = 1;

export default class GameObject extends Container {

  id:number;
  types:string[];

  constructor(types?:string[]) {
    super();
    this.id = nextGlobalId++;
    this.types = types || [];
  }

  getObjectTypes():string[] {
    return this.types;
  }

  isA(type:string) {
    return this.getObjectTypes().indexOf(type) !== -1;
  }

}
