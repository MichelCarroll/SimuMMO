
import {Command} from './Command';

export interface Agent {
  processTurn(executor:(cmd:Command)=>void):boolean;
}
