
declare function require(name:string):any;

const synaptic = require('synaptic');

export default class NeuralNetworkModel {

  BATCH_SIZE = 100;
  LEARNING_RATE = 0.3;
  DISCOUNTING_FACTOR = 0.8;
  EPSILON = 0.2;

  pastTrainingFeatures:number[][];
  pastTrainingLabels:number[];
  numberPossibleActions:number;

  network:any;

  constructor(sizeOfState:number, numberPossibleActions:number) {
    this.pastTrainingFeatures = [];
    this.pastTrainingLabels = [];
    let sizeInputs = sizeOfState + numberPossibleActions - 1;
    this.network = new synaptic.Architect.Perceptron(sizeInputs, sizeInputs, 1);
    this.numberPossibleActions = numberPossibleActions;
  }

  export():any {
    return this.network.toJSON();
  }

  import(data:any) {
    this.network = synaptic.Network.fromJSON(data);
  }

  getBatch():any {
    let shuffled:any = this.pastTrainingFeatures.slice(0);
    let shuffled2:any = this.pastTrainingLabels.slice(0);
    let i = shuffled.length;
    let temp = 0;
    let temp2 = 0;
    let index = 0;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        temp2 = shuffled2[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
        shuffled2[index] = shuffled2[i];
        shuffled2[i] = temp2;
    }

    return [
      shuffled.slice(0, this.BATCH_SIZE),
      shuffled2.slice(0, this.BATCH_SIZE),
    ];
  }

  denormalizeReward(q:number) {
    return -Math.log(1/q - 1);
  }

  normalizeReward(reward:number) {
    return 1 / (1 + Math.exp(-reward));
  }

  update() {
    let batch = this.getBatch();
    for(let x = 0; x < batch[0].length; x++) {
      this.network.activate(batch[0][x]);
      this.network.propagate(this.LEARNING_RATE, [this.normalizeReward(batch[1][x])]);
    }
  }

  getRandomAction() {
    return Math.floor(Math.random() * this.numberPossibleActions);
  }

  stateActionToInput(state:number[], action:number) {
    let actionArray = Array.apply(null, Array(this.numberPossibleActions-1)).map(Number.prototype.valueOf,0);
    if(action > 0) {
      actionArray[action-1] = 1;
    }
    return state.concat(actionArray);
  }

  getBestActionFromState(state:number[], useEpsilon:boolean):number[] {
    if(useEpsilon && Math.random() < this.EPSILON) {
      let action = this.getRandomAction();
      return[0, action];
    }

    var highestQ:number = null;
    var highestAction:number = null;
    for(let x = 0; x < this.numberPossibleActions; x++) {
      let output = this.network.activate(this.stateActionToInput(state, x))[0];
      if(highestQ === null || output > highestQ) {
        highestQ = output;
        highestAction = x;
      }
    }
    return [highestQ, highestAction];
  }

  addTrainingExample(state:number[], action:number, reward:number, nextState:number[]) {
    let [qPrime, highestActionNumber] = this.getBestActionFromState(nextState, false);
    this.pastTrainingFeatures.push(this.stateActionToInput(state, action));
    this.pastTrainingLabels.push(reward + this.DISCOUNTING_FACTOR * this.denormalizeReward(qPrime));

    // console.log({
    //   x: this.stateActionToInput(state, action),
    //   highestAction: highestActionNumber,
    //   qPrime: this.denormalizeReward(qPrime),
    //   reward: reward,
    //   y: reward + this.DISCOUNTING_FACTOR * this.denormalizeReward(qPrime)
    // });
  }

}
