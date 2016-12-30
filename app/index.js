"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $ = require('jQuery');
var React = require("react");
var ReactDOM = require("react-dom");
var react_1 = require("react");
var mobx_1 = require("mobx");
var mobx_react_1 = require("mobx-react");
var TicTacToeTable = (function (_super) {
    __extends(TicTacToeTable, _super);
    function TicTacToeTable(props) {
        return _super.call(this, props) || this;
    }
    TicTacToeTable.prototype.render = function () {
        return (React.createElement("table", { id: "spacesTable" },
            React.createElement("tbody", null,
                React.createElement(TicTacToeRow, { game: this.props.game, spaceSelected: this.props.spaceSelected, cellNumStart: "1" }),
                React.createElement(TicTacToeRow, { game: this.props.game, spaceSelected: this.props.spaceSelected, cellNumStart: "4" }),
                React.createElement(TicTacToeRow, { game: this.props.game, spaceSelected: this.props.spaceSelected, cellNumStart: "7" }))));
    };
    return TicTacToeTable;
}(react_1.Component));
TicTacToeTable = __decorate([
    mobx_react_1.observer
], TicTacToeTable);
var TicTacToeRow = (function (_super) {
    __extends(TicTacToeRow, _super);
    function TicTacToeRow(props) {
        var _this = _super.call(this, props) || this;
        _this.cellNumStart = parseInt(_this.props.cellNumStart);
        return _this;
    }
    TicTacToeRow.prototype.render = function () {
        debugger;
        return (React.createElement("tr", null,
            React.createElement(TicTacToeSpace, { handleClick: this.props.spaceSelected, letter: this.props.game.gameBoard[this.cellNumStart], cellId: this.cellNumStart }),
            React.createElement(TicTacToeSpace, { handleClick: this.props.spaceSelected, letter: this.props.game.gameBoard[this.cellNumStart + 1], cellId: this.cellNumStart + 1 }),
            React.createElement(TicTacToeSpace, { handleClick: this.props.spaceSelected, letter: this.props.game.gameBoard[this.cellNumStart + 2], cellId: this.cellNumStart + 2 })));
    };
    return TicTacToeRow;
}(react_1.Component));
TicTacToeRow = __decorate([
    mobx_react_1.observer
], TicTacToeRow);
var TicTacToeSpace = (function (_super) {
    __extends(TicTacToeSpace, _super);
    function TicTacToeSpace(props) {
        return _super.call(this, props) || this;
    }
    TicTacToeSpace.prototype.render = function () {
        debugger;
        return (React.createElement("td", null,
            React.createElement("div", { onClick: this.props.handleClick, className: "text-center gameSpace", id: this.props.cellId }, this.props.letter)));
    };
    return TicTacToeSpace;
}(react_1.Component));
TicTacToeSpace = __decorate([
    mobx_react_1.observer
], TicTacToeSpace);
var TicTacToePrompt = (function (_super) {
    __extends(TicTacToePrompt, _super);
    function TicTacToePrompt(props) {
        return _super.call(this, props) || this;
    }
    TicTacToePrompt.prototype.render = function () {
        debugger;
        return (React.createElement("div", { id: "prompt", className: this.props.className + " text-center" },
            "Do you want to be ",
            React.createElement("br", null),
            React.createElement("a", { className: "letter", onClick: this.props.handleClick }, "X"),
            " or ",
            React.createElement("a", { className: "letter", onClick: this.props.handleClick }, "O"),
            "?"));
    };
    return TicTacToePrompt;
}(react_1.Component));
var TicTacToeGame = (function (_super) {
    __extends(TicTacToeGame, _super);
    function TicTacToeGame() {
        var _this = _super.call(this) || this;
        _this.spaceSelected = _this.spaceSelected.bind(_this);
        _this.selectLetter = _this.selectLetter.bind(_this);
        _this.game = new Game();
        return _this;
    }
    TicTacToeGame.prototype.selectLetter = function (e) {
        debugger;
        var user = $(e.target).html();
        var computer = user === "O" ? "X" : "O";
        this.game.user.letterSelection = user;
        this.game.computer.letterSelection = computer;
        this.tableDisplay = true;
    };
    TicTacToeGame.prototype.spaceSelected = function (e) {
        debugger;
        //which cell
        var selectedSpace = parseInt($(e.target).attr("id"));
        var self = this;
        if (this.game.user.isPlaying) {
            debugger;
            this.game.gameBoard.setSpace(selectedSpace, this.game.user.letterSelection);
            this.game.processSelection(this.game.user.letterSelection);
            if (!this.game.gameEnded) {
                this.game.user.isPlaying = false;
                this.game.computer.isPlaying = true;
                setTimeout(function () {
                    var spaceNumber = self.game.computer.getSpace();
                    self.game.gameBoard.setSpace(spaceNumber, self.game.computer.letterSelection);
                    self.game.processSelection(self.game.computer.letterSelection);
                    if (!self.game.gameEnded) {
                        self.game.user.isPlaying = true;
                        self.game.computer.isPlaying = false;
                    }
                }, 2000);
            }
        }
    };
    TicTacToeGame.prototype.render = function () {
        debugger;
        // <TicTacToeReplay handleClick={this.selectLetter} className={this.user.won ? "hide" : "show"}/>  
        return (React.createElement("div", null,
            React.createElement(TicTacToePrompt, { handleClick: this.selectLetter, className: this.tableDisplay || this.game.user.isWinner || this.game.user.isWinner ? "hide" : "show" }),
            React.createElement("div", { id: "chalkboard", className: this.tableDisplay || this.game.user.isWinner || this.game.user.isWinner ? "show" : "hide" },
                React.createElement("div", { id: "ticTacToeBoard", className: "center-block", disabled: this.game.user.isPlaying ? false : true },
                    React.createElement(TurnIndicator, { user: this.game.user }),
                    React.createElement(TicTacToeTable, { game: this.game, spaceSelected: this.spaceSelected })))));
    };
    return TicTacToeGame;
}(react_1.Component));
__decorate([
    mobx_1.observable
], TicTacToeGame.prototype, "tableDisplay", void 0);
__decorate([
    mobx_1.observable
], TicTacToeGame.prototype, "game", void 0);
TicTacToeGame = __decorate([
    mobx_react_1.observer
], TicTacToeGame);
var TurnIndicator = (function (_super) {
    __extends(TurnIndicator, _super);
    function TurnIndicator(props) {
        return _super.call(this, props) || this;
    }
    TurnIndicator.prototype.render = function () {
        debugger;
        return (React.createElement("div", { className: "text-capitalize " + (this.props.user.isPlaying ? "userSpace" : "computerSpace") },
            this.props.user.isPlaying ? "your" : "computer's",
            " Turn"));
    };
    return TurnIndicator;
}(react_1.Component));
TurnIndicator = __decorate([
    mobx_react_1.observer
], TurnIndicator);
var Game = (function () {
    function Game() {
        this.computer = new Computer(false, this);
        this.user = new User(true);
        this.winningCombos = [
            [1, 2, 3],
            [1, 4, 7],
            [1, 5, 9],
            [2, 5, 8],
            [3, 5, 7],
            [3, 6, 9],
            [4, 5, 6],
            [7, 8, 9]
        ];
        this.gameBoard = new GameBoard();
    }
    Game.prototype.hasWon = function (letter) {
        var _this = this;
        this.winningCombos.some(function (combo) {
            var match = combo.every(function (space) {
                return _this.gameBoard.spaces[combo[0]] === letter;
            });
            return match;
        });
        return false;
    };
    Game.prototype.processSelection = function (letterSelection) {
        if (this.hasWon(letterSelection)) {
            this.user.isWinner = true;
            this.gameEnded = true;
        }
        else if (this.gameBoard.isAllFilled()) {
            this.gameEnded = true;
        }
    };
    return Game;
}());
__decorate([
    mobx_1.observable
], Game.prototype, "gameBoard", void 0);
__decorate([
    mobx_1.observable
], Game.prototype, "user", void 0);
__decorate([
    mobx_1.observable
], Game.prototype, "computer", void 0);
__decorate([
    mobx_1.observable
], Game.prototype, "gameEnded", void 0);
var GameBoard = (function () {
    function GameBoard() {
        this.spaces = ["", "", "", "", "", "", "", "", "", ""];
        this.spacesAllFilled = false;
    }
    GameBoard.prototype.setSpace = function (spaceNumber, letter) {
        if (spaceNumber !== -1 && this.spaces[spaceNumber] === "") {
            this.spaces[spaceNumber] = letter;
        }
    };
    GameBoard.prototype.isAllFilled = function () {
        return this.getBlankSpace() === -1;
    };
    GameBoard.prototype.getBlankSpace = function () {
        var _this = this;
        var spaceNumber = -1;
        var i = 0;
        this.spaces.some(function (space) {
            if (_this.spaces[i] === "") {
                spaceNumber = i;
                return true;
            }
            i++;
        });
        return spaceNumber;
    };
    return GameBoard;
}());
__decorate([
    mobx_1.observable
], GameBoard.prototype, "spaces", void 0);
var Computer = (function () {
    function Computer(isPlaying, game) {
        this.isPlaying = isPlaying;
        this.game = game;
        this.isWinner = false;
    }
    Computer.prototype.getSpace = function () {
        debugger;
        var spaceNumber = this.getBlockOrWin();
        if (spaceNumber == -1) {
            spaceNumber = this.getBlankCornerSpace();
        }
        if (spaceNumber == -1) {
            spaceNumber = this.game.gameBoard.getBlankSpace();
        }
        return spaceNumber;
    };
    Computer.prototype.getBlockOrWin = function () {
        var _this = this;
        var self = this;
        var spaceNumber = -1;
        //For every winning combination, if two of the three squares for that winning combo are marked, it is a block or win.
        this.game.winningCombos.some(function (combo) {
            //store the blank cell numbers and count of spaces belonging to the computer 
            var blankSpaces = _this.getSpacesByType(combo, "");
            var computerSpaces = _this.getSpacesByType(combo, self.letterSelection);
            var userSpaces = _this.getSpacesByType(combo, self.letterSelection === "X" ? "0" : "X");
            var blankCount = blankSpaces.length;
            if (blankCount + computerSpaces.length === 3) {
                self.isWinner = true;
                return true;
            }
            else if (blankCount === 1) {
                if (computerSpaces.length === 2) {
                    spaceNumber = blankSpaces[0];
                    return true;
                }
                else if (userSpaces.length === 2) {
                    spaceNumber = blankSpaces[0];
                    return true;
                }
            }
        });
        return spaceNumber;
    };
    Computer.prototype.getBlankCornerSpace = function () {
        var corners = [1, 3, 7, 9];
        var self = this;
        var spaceNumber = -1;
        corners.some(function (corner) {
            if (self.game.gameBoard[corner] === "") {
                spaceNumber = corner;
                return true;
            }
        });
        return spaceNumber;
    };
    Computer.prototype.getSpacesByType = function (winCombo, letter) {
        var spaces = [];
        for (var x = 0; x < 3; x++) {
            var winSpace = winCombo[x];
            var space = this.game.gameBoard[winSpace];
            if (space === letter) {
                spaces.push(winSpace);
            }
        }
        return spaces;
    };
    return Computer;
}());
__decorate([
    mobx_1.observable
], Computer.prototype, "isPlaying", void 0);
__decorate([
    mobx_1.observable
], Computer.prototype, "isWinner", void 0);
var User = (function () {
    function User(isPlaying) {
        this.isPlaying = isPlaying;
        this.isWinner = false;
    }
    return User;
}());
__decorate([
    mobx_1.observable
], User.prototype, "isPlaying", void 0);
__decorate([
    mobx_1.observable
], User.prototype, "isWinner", void 0);
//Outcomes
//==============
//Computer wins.
//You win.
//Draw.
ReactDOM.render(React.createElement(TicTacToeGame, null), document.getElementById("gameBoard"));
