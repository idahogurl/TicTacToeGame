var $ = require("jQuery");
var React = require("react");
var ReactDOM = require("react-dom");

import {Component} from "react";
import {observable} from "mobx";
import {observer} from "mobx-react";


class TicTacToeTable extends Component {
  props:any;
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <table className={this.props.className}>
        <TicTacToeRow spaceNumberBegin="1" gameBoard={this.props.gameBoard} handleClick={this.props.handleClick}/>
        <TicTacToeRow spaceNumberBegin="4" gameBoard={this.props.gameBoard} handleClick={this.props.handleClick}/>
        <TicTacToeRow spaceNumberBegin="7" gameBoard={this.props.gameBoard} handleClick={this.props.handleClick}/>
      </table>
    );
  }
}

@observer
class TicTacToeRow extends Component {
  props: any;

  constructor() {
    super();
  }
  render() {
    let beginNumber = parseInt(this.props.spaceNumberBegin);
    return (
      <tr>
        <TicTacToeSpace id={beginNumber} onClick={this.props.handleClick} 
            letter={this.props.gameBoard.spaces[beginNumber]} />
        <TicTacToeSpace id={beginNumber + 1} onClick={this.props.handleClick}
            letter={this.props.gameBoard.spaces[beginNumber + 1]}/>
        <TicTacToeSpace id={beginNumber + 2} onClick={this.props.handleClick}
            letter={this.props.gameBoard.spaces[beginNumber + 2]}/>
      </tr>
    );
  }
}

class TicTacToeSpace extends Component {
   props: any;
   constructor(props) {
        super(props);
    }
  render() {
    return (
      <td onClick={this.props.handleClick} id={this.props.spaceNumber}>{this.props.letter}</td>
    );
  }
}

class TicTacToePrompt extends Component {
  props: any;
  constructor(props) {
   super(props);
  }

  render() {
  return (
     <div id="prompt" className="text-center">
      Do you want to be <br/><a className="letter" onClick={this.props.handleClick}>X</a> or 
        <a className="letter" onClick={this.props.handleClick}>O</a>?
      </div>
    );
  }
}

@observer class TicTacToeGame extends Component {
  game: Game;
  tableDisplay: boolean;
  
  constructor() {
    super();

    this.tableDisplay = false;
    this.game = new Game();
  }
  
  selectLetter(e) {
    let user: string = $(e.target).html();
    let computer: string = user === "O" ? "X" : "O";
    this.game.user.letterSelection = user;
    this.game.computer.letterSelection = computer;

    this.tableDisplay = true;
  }

  spaceSelected(e) {
      let spaceSelection = $(e.target).attr("id");
      if (!this.game.computer.isPlaying) {
        this.game.gameTable.setSpace(spaceSelection, this.game.user.letterSelection);
        this.game.user.isPlaying = false;

        this.game.user.isWinner = this.game.hasWon(this.game.user);
        this.game.ended === this.game.gameTable.isFilled() || this.game.user.isWinner;
        
        if (!this.game.ended) {
          this.game.computer.isPlaying = true;

          setTimeout(function() {
            this.game.computer.play(this.game);
            this.game.computer.isWinner = this.game.hasWon(this.game.computer);
            this.game.ended === this.game.gameTable.isFilled() || this.game.computer.isWinner;
          }, 2000);

      }
    }
  }

  render() {
    return (<div><TicTacToePrompt handleClick={this.selectLetter.bind(this)} className={this.tableDisplay ? "hide" : "show"}/>
    <TurnIndicator user={this.game.user}/>
    <TicTacToeTable handleClick={this.spaceSelected.bind(this)} className={this.tableDisplay ? "show" : "hide"}/></div>);
  }
}

class TurnIndicator extends Component {
  props: any;
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div class="text-capitalize {this.props.user.isPlaying ? 'usersTurn' : 'computersTurn'}">{this.props.user.isPlaying ? "your" : "computer's"} Turn</div>
    );
  }
}

interface IPlayer {
    letterSelection: string;
    isWinner: boolean;
    isPlaying: boolean;
}

class User implements IPlayer {
    letterSelection: string;
    @observable isWinner: boolean;
    @observable isPlaying: boolean;
}

class Computer implements IPlayer {
    letterSelection: string;
    @observable isWinner: boolean;
    @observable isPlaying: boolean;
    game: Game;

    constructor(game: Game) {
      this.game = game;
    }

    play() {
      let spaceNumber: number;

        spaceNumber = this.getBlockOrWinSpace();
        if (spaceNumber === -1) {
          this.getEmptyCornerSpace();
        }
        if (spaceNumber === -1) {
          this.getEmptySpace();
        }
        
        this.game.gameTable.setSpace(spaceNumber, this.letterSelection);
        this.isPlaying = false;
    }

    getBlockOrWinSpace() : number {
      let spaceNumber: number = -1;
      
      this.game.winningCombos.some(combo => {
          let emptySpaces: number = 0;

          combo.map(space => {
            if (space === "") {
              emptySpaces++;
            }
          });

        return emptySpaces === 1;
      });
      return spaceNumber;
    }

    getEmptyCornerSpace() : number {
      let spaceNumber:number = 0;
      let cornerSpaces: number[] = [1,3,7,9];
      let hasEmpty = cornerSpaces.some(corner => {
        spaceNumber = corner;
        return this.game.gameTable.spaces[corner] === "";
      });
      return hasEmpty ? spaceNumber : -1;
    }

    getEmptySpace() : number {
      let spaceNumber:number = 0;
      
      let hasEmpty = this.game.gameTable.spaces.some(space => {
        spaceNumber++;
        return this.game.gameTable.spaces[spaceNumber] === "";
      });
      return hasEmpty ? spaceNumber : -1;
    }
}

class GameTable {
 @observable spaces: string[];
 constructor() {
     this.spaces = ["","","","","","","","","",""];
 }

 setSpace(spaceNumber: number, letter: string) {
     if (this.spaces[letter] === "") {
        this.spaces[spaceNumber] = letter;
     }
 }

 isFilled() : boolean {
   let emptySpaces : string[] = this.spaces.filter(space => {
     return space === "";
   });
   return emptySpaces.length === 0;
 }
}

class Game {
  computer: Computer;
  user: User;
  gameTable: GameTable;
  ended: boolean;
  winningCombos: any[];

  constructor() {
      this.computer = new Computer(this);
      this.user = new User();
      this.gameTable = new GameTable();
      this.ended = false;
      
      this.winningCombos = [
          [1,2,3],
          [1,4,7],
          [1,5,9],
          [2,5,7],
          [3,6,9],
          [3,5,7],
          [4,5,6],
          [7,8,9]
        ];
    }

    hasWon(user: IPlayer) : boolean {
     let winFound: boolean;
     return this.winningCombos.some(combo => {
        let winFound = combo.every(spaceNumber => {
          return this.gameTable.spaces[spaceNumber] === user.letterSelection;
        });
          return winFound;
        });
    }
}
//Outcomes
//Computer wins.
//You win.
//Draw.

//Computer's Turn
//Your Turn
ReactDOM.render(
    <TicTacToeGame/>, document.getElementById("gameBoard"));