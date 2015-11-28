
declare function require(name:string):any;

const NeuralNetwork = require('neural_network');
const os = require('os');


export default class NeuralNetworkModel {

  BATCH_SIZE = 10;
  DISCOUNTING_FACTOR = 0.8;

  pastTrainingFeatures:number[][];
  pastTrainingLabels:number[][];
  numberPossibleActions:number;

  neuralNetwork:any;
  model:any;

  constructor(numberPossibleActions:number) {
    this.pastTrainingFeatures = [];
    this.pastTrainingLabels = [];
    this.neuralNetwork = new NeuralNetwork();
    this.numberPossibleActions = numberPossibleActions;
  }

  getBatch():any {
    return [
      this.getRandomSubarray(this.pastTrainingFeatures, this.BATCH_SIZE),
      this.getRandomSubarray(this.pastTrainingLabels, this.BATCH_SIZE)
    ];
  }

  getPredictSetup(input:any):any {
    let batch = this.getBatch();
    return {
        model: this.model,
        inputVector: input,
        numberOfActivationUnitsL1: 4,
        numberOfActivationUnitsL2: 4
    };
  }

  getTrainSetup():any {
    let batch = this.getBatch();
    return {
        model: this.model,
        trainingSetInput: batch[0],
        trainingSetOutput: batch[1],
        numberOfActivationUnitsL1: 4,
        numberOfActivationUnitsL2: 4,
        numberOfNodes: os.cpus().length - 1,
        numberOfExamplesPerNode: 4,
        learningRate: 0.5,
        maxCostError: 0.001,
        maxNoOfIterations: 1
    };
  }

  update(done:()=>any) {
    this.neuralNetwork.train(this.getTrainSetup(), (err:any, model:any) => {
      this.model = model;
      done();
    });
  }

  getBestActionFromState(state:number[], callback:(q:number, action:number)=>void) {
    if(!this.model) {
      callback(0, 0);
      return;
    }

    var highestQ:number = null;
    var highestAction:number = null;
    for(let x = 0; x < this.numberPossibleActions; x++) {
      this.neuralNetwork.predict(this.getPredictSetup([state.concat(x)]), (err:number, q:number) => {
        if(highestQ === null || q > highestQ) {
          highestQ = q;
          highestAction = x;
        }
        if(x === this.numberPossibleActions - 1) {
          callback(highestQ, highestAction);
        }
      });
    }
  }

  addTrainingExample(state:number[], action:number, reward:number, nextState:number[]) {
    this.getBestActionFromState(nextState, (qPrime, action) => {
      this.pastTrainingFeatures.push(state.concat(action));
      this.pastTrainingLabels.push([reward + this.DISCOUNTING_FACTOR * qPrime]);
    });
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
