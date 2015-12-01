


export interface Command {
  execute():void;
  describe():string;
  getTurnCooldown():number;
  getReward():number;
}
