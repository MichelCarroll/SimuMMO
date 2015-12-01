
declare function require(name:string):any;
var inquirer = require('inquirer');

import GameObject from '../Common/GameObject';

export default class Client {

  processAction() {

  }

  execute(game:any) {

    var processAction = function() {
      inquirer.prompt({
          type: "list",
          name: "action",
          message: "What do you want to do?",
          choices: [ "Wait", "Explore", "Exit" ]
        },
        function(answers:any) {
          switch(answers.action) {
            case 'Explore':
              processExplore(game.getWorld(), function() {
                setTimeout(processAction, 0);
              });
              break;
            case 'Wait':
              processWait(function() {
                setTimeout(processAction, 0);
              });
              break;
            case 'Exit':
             break;
          }
        }
      );
    };

    var explodeGOContent = function(object:GameObject) {
      return object.id+': '+object.types?object.types.join(','):'';
    }

    var processExplore = function(object:GameObject, done:any) {
      var contents = object.all();
      var contentsListing:any = [];

      if(!contents.length) {
        console.log(object);
        processExplore(object.getParent(), done);
        return;
      }

      contentsListing = contents.map(explodeGOContent);
      contentsListing.push('Continue');
      if(object.getParent()) {
        contentsListing.push('Back to Parent');
      }

      inquirer.prompt({
          type: "list",
          name: "content",
          message: "What do you want to explore?",
          choices: contentsListing
        },
        function(answers:any) {
          var index = contentsListing.indexOf(answers.content);
          if(index === -1 || answers.content === 'Continue') {
            done();
          } else if(answers.content === 'Back to Parent') {
            processExplore(object.getParent(), done);
          } else {
            processExplore(contents[index], done);
          }
        }
      );
    }

    var processWait = function(done:any) {
      inquirer.prompt({
          type: "input",
          name: "time",
          message: "How long do you want to wait for?",
          default: 1,
          filter: Number
        },
        function(answers:any) {
          game.run(answers.time);
          done();
        }
      );
    }

    processAction();
  }


}
