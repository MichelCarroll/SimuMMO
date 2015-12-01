
declare function require(name:string):any;
var inquirer = require('inquirer');

import GameObject from '../Common/GameObject';

export default class Client {

  private game:any;

  constructor(game:any) {
    this.game = game;
    this.game.getCommandQueue().subscribe(this.onCommand.bind(this));
  }

  onCommand(description:string) {
    console.log(description);
  }

  execute(game:any) {
    this.processAction();
  }

  showGameObject(object:GameObject) {
    console.log(JSON.stringify(object.describe(), null, 4));
  }

  processAction() {
    inquirer.prompt({
        type: "list",
        name: "action",
        message: "What do you want to do?",
        choices: [ "Wait", "Explore", "Exit" ]
      },
      (answers:any) => {
        switch(answers.action) {
          case 'Explore':
            this.processExplore(this.game.getWorld(), () =>{
              setTimeout(this.processAction.bind(this), 0);
            });
            break;
          case 'Wait':
            this.processWait(() => {
              setTimeout(this.processAction.bind(this), 0);
            });
            break;
          case 'Exit':
           break;
        }
      }
    );
  }

  processExplore(object:GameObject, done:any) {
    var contents = object.all();
    var contentsListing:any = [];

    this.showGameObject(object);

    contentsListing = contents.map((object:GameObject) => object.toString());
    if(object.getParent()) {
      contentsListing.push('Back to Parent');
    }
    contentsListing.push('Continue');

    inquirer.prompt({
        type: "list",
        name: "content",
        message: "Which content do you want to explore?",
        choices: contentsListing
      },
      (answers:any) => {
        var index = contentsListing.indexOf(answers.content);
        if(index === -1 || answers.content === 'Continue') {
          done();
        } else if(answers.content === 'Back to Parent') {
          this.processExplore(object.getParent(), done);
        } else {
          this.processExplore(contents[index], done);
        }
      }
    );
  }

  processWait(done:any) {
    inquirer.prompt({
        type: "input",
        name: "time",
        message: "How long do you want to wait for?",
        default: 1,
        filter: Number
      },
      (answers:any) => {
        this.game.run(answers.time);
        done();
      }
    );
  }

}
