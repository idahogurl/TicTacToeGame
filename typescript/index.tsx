const $ = require("jQuery");
const React = require("react");
const ReactDOM = require("react-dom");

import {Component} from "react";
import {observable} from "mobx";
import {observer} from "mobx-react";

@observer
class TicTacToeTable extends Component {
  props:any;
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <table id="gameTable" className="center-block" disabled={this.props.game.computer.isPlaying ? "disabled" : ""}>
        <tbody>
        <TicTacToeRow spaceNumberBegin="1" gameBoard={this.props.game.gameTable} handleClick={this.props.handleClick}/>
        <TicTacToeRow spaceNumberBegin="4" gameBoard={this.props.game.gameTable} handleClick={this.props.handleClick}/>
        <TicTacToeRow spaceNumberBegin="7" gameBoard={this.props.game.gameTable} handleClick={this.props.handleClick}/>
        </tbody>
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
        <TicTacToeSpace spaceNumber={beginNumber} handleClick={this.props.handleClick} 
            letter={this.props.gameBoard.spaces[beginNumber]} />
        <TicTacToeSpace spaceNumber={beginNumber + 1} handleClick={this.props.handleClick}
            letter={this.props.gameBoard.spaces[beginNumber + 1]}/>
        <TicTacToeSpace spaceNumber={beginNumber + 2} handleClick={this.props.handleClick}
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
      <td id={this.props.spaceNumber} className="gameSpace" onClick={this.props.handleClick}>{this.props.letter}</td>
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
     <div id="prompt" className={this.props.className}>
      Do you want to be <br/><a className="letter" onClick={this.props.handleClick}>X</a> or <a className="letter" onClick={this.props.handleClick}>O</a>?
      </div>
    );
  }
}

@observer class TicTacToeGame extends Component {
  game: Game;
  @observable tableDisplay: boolean;
  
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
      debugger;
      let spaceSelection = $(e.target).attr("id");
      if (!this.game.computer.isPlaying) {
        let success: boolean = this.game.gameTable.setSpace(spaceSelection, this.game.user.letterSelection);
        if (success) {
            this.game.user.isWinner = this.game.hasWon(this.game.user);
            this.game.ended = this.game.gameTable.isFilled() || this.game.user.isWinner;
            
            if (!this.game.ended) {
              this.game.user.isPlaying = false;
              this.game.computer.isPlaying = true;
            
              let self: any = this;
              setTimeout(function() {
                self.game.computer.play();
                self.game.computer.isWinner = self.game.hasWon(self.game.computer);
                self.game.ended = self.game.gameTable.isFilled() || self.game.computer.isWinner;
              }, 2000);
          }
        }
    }
  }

  render() {
        debugger;
    return (<div>
      <TicTacToePrompt handleClick={this.selectLetter.bind(this)} className={this.tableDisplay ? "hide" : "show"}/>
      <GameOverNotification message={this.game.user.isWinner ? "You win." : this.game.computer.isWinner ? "Computer wins." : "Draw"} 
        className={this.game.ended ? "show" : "hide"}/>
      <div id="chalkboard" className={this.tableDisplay && !this.game.ended ? "show" : "hide"}>
        <TurnIndicator computer={this.game.computer}/>
        <TicTacToeTable game={this.game} handleClick={this.spaceSelected.bind(this)}/>
      </div>
    </div>);
  }
}

@observer
class GameOverNotification extends Component {
  props: any;

  constructor(props) {
    super(props);
  }
  render() {
    
    return (
      <div className={this.props.className} id="prompt">
        Game Over. {this.props.message}
      <div>
      <a href="">Play again?</a>
      </div>
      </div>
    );
  }
}

@observer
class TurnIndicator extends Component {
  props: any;
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div className={!this.props.computer.isPlaying ? "usersTurn" : "computersTurn"}>{!this.props.computer.isPlaying ? "your" : "computer's"} Turn</div>
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

    constructor() {
      this.isWinner = false;
      this.isPlaying = true;
    }
}

class Computer implements IPlayer {
    letterSelection: string;
    @observable isWinner: boolean;
    @observable isPlaying: boolean;
    game: Game;

    constructor(game: Game) {
      this.game = game;
      this.isWinner = false;
      this.isPlaying = false;
    }

    play() {
      let spaceNumber: number;

        spaceNumber = this.getWinSpace();
        if (spaceNumber === -1) {
          spaceNumber = this.getBlockSpace();
        }
        if (spaceNumber === -1) {
          spaceNumber = this.getCornerSpace();
        }
        if (spaceNumber === -1) {
          spaceNumber = this.getEmptySpace();
        }
        
        this.game.gameTable.setSpace(spaceNumber, this.letterSelection);
        this.isPlaying = false;
    }

    getWinSpace() : number {
      let spaceNumber: number;
      
      let spaceFound = this.game.winningCombos.some(combo => {
          let emptySpaces: number = 0;
          let computerSpaces: number = 0;

          combo.map(space => {
            let value: string = this.game.gameTable.spaces[space];
            if (value === "") {
              spaceNumber = space;
              emptySpaces++;
            } else if (value === this.letterSelection) { 
              computerSpaces++;
            }
          });

        return emptySpaces === 1 && computerSpaces === 2;
      });
      if (!spaceFound) spaceNumber = -1;
      return spaceNumber;
    }

    getBlockSpace() : number {
      let spaceNumber: number;
      
      let spaceFound = this.game.winningCombos.some(combo => {
         let emptySpaces: number = 0;
          let userSpaces: number = 0;

          combo.map(space => {
           let value: string = this.game.gameTable.spaces[space];
            if (value === "") {
              spaceNumber = space;
              emptySpaces++;
            } else if (value !== this.letterSelection) { 
              userSpaces++;
            }
          });

        return emptySpaces === 1 && userSpaces === 2;
      });
      if (!spaceFound) spaceNumber = -1;
      return spaceNumber;
    }

    getCornerSpace() : number {
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
     this.spaces = ["-1","","","","","","","","",""]; //-1 simplifies zero-indexing
 }

 setSpace(spaceNumber: number, letter: string): boolean {
     if (this.spaces[spaceNumber] === "") {
        this.spaces[spaceNumber] = letter;
        return true;
     }
     return false;
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
  @observable ended: boolean;
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
          [2,5,8],
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