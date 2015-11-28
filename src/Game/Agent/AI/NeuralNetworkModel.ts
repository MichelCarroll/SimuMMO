
declare function require(name:string):any;

const synaptic = require('synaptic');

export default class NeuralNetworkModel {

  BATCH_SIZE = 10;
  LEARNING_RATE = 0.3;
  DISCOUNTING_FACTOR = 0.8;
  EPSILON = 0.25;

  pastTrainingFeatures:number[][];
  pastTrainingLabels:number[][];
  numberPossibleActions:number;

  network:any;

  constructor(sizeOfState:number, numberPossibleActions:number) {
    this.pastTrainingFeatures = [];
    this.pastTrainingLabels = [];
    this.network = new synaptic.Architect.Perceptron(sizeOfState+1, 25, 1);
    this.numberPossibleActions = numberPossibleActions;
  }

  getBatch():any {
    return [
      this.getRandomSubarray(this.pastTrainingFeatures, this.BATCH_SIZE),
      this.getRandomSubarray(this.pastTrainingLabels, this.BATCH_SIZE)
    ];
  }

  update() {
    let batch = this.getBatch();
    for(let x = 0; x < batch[0].length; x++) {
      this.network.activate(batch[0][x]);
      this.network.propagate(this.LEARNING_RATE, batch[1][x]);
    }
  }

  getRandomAction() {
    return Math.floor(Math.random() * this.numberPossibleActions);
  }

  getBestActionFromState(state:number[]):number[] {
    if(Math.random() < this.EPSILON) {
      return[0, this.getRandomAction()];
    }

    var highestQ:number = null;
    var highestAction:number = null;
    for(let x = 0; x < this.numberPossibleActions; x++) {
      let output = this.network.activate(state.concat(x));
      if(highestQ === null || output > highestQ) {
        highestQ = output;
        highestAction = x;
      }
    }
    return [highestQ, highestAction];
  }

  addTrainingExample(state:number[], action:number, reward:number, nextState:number[]) {
    let [qPrime] = this.getBestActionFromState(nextState);
    this.pastTrainingFeatures.push(state.concat(action));
    this.pastTrainingLabels.push([reward + this.DISCOUNTING_FACTOR * qPrime]);
  }

  getRandomSubarray(arr:Array<any>, size:number) {
      let shuffled = arr.slice(0)
      let i = arr.length;
      let temp = 0;
      let index = 0;
      while (i--) {
          index = Math.floor((i + 1) * Math.random());
          temp = shuffled[index];
          shuffled[index] = shuffled[i];
          shuffled[i] = temp;
      }
      return shuffled.slice(0, size);
  }

}
