

let nextGlobalId = 1;

export default class GameObject {

  constructor() {
    this.id = nextGlobalId++;
  }

  getContainer() {
    return this.container;
  }

  setContainer(container) {
    this.container = container;
  }

  getObjectTypes() {
    return [];
  }

  isA(type) {
    return this.getObjectTypes().indexOf(type) !== -1;
  }

}
