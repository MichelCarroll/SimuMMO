
import {Command} from '../Command';
import Player from '../Being/Player';
import Monster from '../Being/Monster';

export default class KillCommand implements Command {

  player:Player;
  monster:Monster;

  constructor(player:Player, monster:Monster) {
    this.player = player;
    this.monster = monster;
  }

  execute() {
    this.player.injure(10);
    this.player.getInventory().giveMoney(this.monster.getInventory().getMoney());
    this.monster.getContainer().contents.remove(this.monster);
  }

  describe() {
    return `Player #${this.player.id} killed Monster #${this.monster.id}`;
  }

  getTurnCooldown():number {
    return 0;
  }

}
