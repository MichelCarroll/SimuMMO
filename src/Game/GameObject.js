

let nextGlobalId = 1;

export default class GameObject {

  constructor() {
    this.id = nextGlobalId++;
  }

  getObjectTypes() {
    return [];
  }

}
