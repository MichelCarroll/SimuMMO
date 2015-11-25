

import Game from '../game/Game/Game.js'
const should = require("should");

describe('lol', function() {
  let game = null;

  beforeEach(function(){
    game = new Game();
    game.initiate();
  });

  it('lol', function() {
    game.run(30);
    // game.debug();
    should(game.player.money).be.eql(6);
  });

});
