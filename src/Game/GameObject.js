

let nextGlobalId = 1;

export default class GameObject {

  constructor() {
    this.id = nextGlobalId++;
  }

  getObjectType() {
    return 'generic';
  }

}
