

export default class Container {

  constructor() {
    this.contents = [];
  }

  add(object) {
    this.contents.push(object);
  }

  remove(object) {
    this.contents.splice(this.contents.findIndex(function(o) { return o.id === object.id; }), 1);
  }

  all() {
    return this.contents;
  }

  oneOfType(type) {
    return this.contents.find((object) => object.getObjectTypes().indexOf(type) !== -1);
  }

}
