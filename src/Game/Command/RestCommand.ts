
import Player from '../Being/Player';
import {Command} from '../Command';

export default class RestCommand implements Command {

  player:Player;

  constructor(player:Player) {
    this.player = player;
  }

  execute() {
    this.player.rest(10);
  }

  describe() {
    return `Player #${this.player.id} rested`;
  }

  getTurnCooldown():number {
    return 0;
  }

}
