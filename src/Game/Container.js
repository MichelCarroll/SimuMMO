

export default class Container {

  constructor(container, isWeak) {
    this.isWeak = !!isWeak;
    this.container = container;
    this.contents = [];
  }

  add(object) {
    if(!this.isWeak) {
        object.setContainer(this.container);
    }
    this.contents.push(object);
  }

  remove(object) {
    this.contents.splice(this.contents.findIndex(function(o) { return o.id === object.id; }), 1);
  }

  all() {
    return this.contents;
  }

  oneOfType(type) {
    return this.contents.find((object) => object.isA(type));
  }

}
