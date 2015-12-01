
import TrainerWorldGenerator from './Generator/TrainerWorldGenerator';
import PlayerAgent from './Agent/PlayerAgent';
import Game from './Game';

export default class AgentTrainingGame extends Game {

  playerAgent:PlayerAgent;

  constructor() {
    super();
    this.playerAgent = (new TrainerWorldGenerator()).generate(this.scheduler);
  }

  exportPlayerAgentBrain():any {
    return this.playerAgent.exportBrain();
  }
}
