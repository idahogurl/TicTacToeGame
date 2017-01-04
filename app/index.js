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
define("index", ["require", "exports", "react", "mobx", "mobx-react"], function (require, exports, react_1, mobx_1, mobx_react_1) {
    "use strict";
    var $ = require("jQuery");
    var React = require("react");
    var ReactDOM = require("react-dom");
    var TicTacToeTable = (function (_super) {
        __extends(TicTacToeTable, _super);
        function TicTacToeTable(props) {
            return _super.call(this, props) || this;
        }
        TicTacToeTable.prototype.render = function () {
            return (React.createElement("table", { className: this.props.className },
                React.createElement(TicTacToeRow, { spaceNumberBegin: "1", gameBoard: this.props.gameBoard, handleClick: this.props.handleClick }),
                React.createElement(TicTacToeRow, { spaceNumberBegin: "4", gameBoard: this.props.gameBoard, handleClick: this.props.handleClick }),
                React.createElement(TicTacToeRow, { spaceNumberBegin: "7", gameBoard: this.props.gameBoard, handleClick: this.props.handleClick })));
        };
        return TicTacToeTable;
    }(react_1.Component));
    var TicTacToeRow = (function (_super) {
        __extends(TicTacToeRow, _super);
        function TicTacToeRow() {
            return _super.call(this) || this;
        }
        TicTacToeRow.prototype.render = function () {
            var beginNumber = parseInt(this.props.spaceNumberBegin);
            return (React.createElement("tr", null,
                React.createElement(TicTacToeSpace, { id: beginNumber, onClick: this.props.handleClick, letter: this.props.gameBoard.spaces[beginNumber] }),
                React.createElement(TicTacToeSpace, { id: beginNumber + 1, onClick: this.props.handleClick, letter: this.props.gameBoard.spaces[beginNumber + 1] }),
                React.createElement(TicTacToeSpace, { id: beginNumber + 2, onClick: this.props.handleClick, letter: this.props.gameBoard.spaces[beginNumber + 2] })));
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
            return (React.createElement("td", { onClick: this.props.handleClick, id: this.props.spaceNumber }, this.props.letter));
        };
        return TicTacToeSpace;
    }(react_1.Component));
    var TicTacToePrompt = (function (_super) {
        __extends(TicTacToePrompt, _super);
        function TicTacToePrompt(props) {
            return _super.call(this, props) || this;
        }
        TicTacToePrompt.prototype.render = function () {
            return (React.createElement("div", { id: "prompt", className: "text-center" },
                "Do you want to be ",
                React.createElement("br", null),
                React.createElement("a", { className: "letter", onClick: this.props.handleClick }, "X"),
                " or",
                React.createElement("a", { className: "letter", onClick: this.props.handleClick }, "O"),
                "?"));
        };
        return TicTacToePrompt;
    }(react_1.Component));
    var TicTacToeGame = (function (_super) {
        __extends(TicTacToeGame, _super);
        function TicTacToeGame() {
            var _this = _super.call(this) || this;
            _this.tableDisplay = false;
            _this.game = new Game();
            return _this;
        }
        TicTacToeGame.prototype.selectLetter = function (e) {
            var user = $(e.target).html();
            var computer = user === "O" ? "X" : "O";
            this.game.user.letterSelection = user;
            this.game.computer.letterSelection = computer;
            this.tableDisplay = true;
        };
        TicTacToeGame.prototype.spaceSelected = function (e) {
            var spaceSelection = $(e.target).attr("id");
            if (!this.game.computer.isPlaying) {
                this.game.gameTable.setSpace(spaceSelection, this.game.user.letterSelection);
                this.game.user.isPlaying = false;
                this.game.user.isWinner = this.game.hasWon(this.game.user);
                this.game.ended === this.game.gameTable.isFilled() || this.game.user.isWinner;
                if (!this.game.ended) {
                    this.game.computer.isPlaying = true;
                    setTimeout(function () {
                        this.game.computer.play(this.game);
                        this.game.computer.isWinner = this.game.hasWon(this.game.computer);
                        this.game.ended === this.game.gameTable.isFilled() || this.game.computer.isWinner;
                    }, 2000);
                }
            }
        };
        TicTacToeGame.prototype.render = function () {
            return (React.createElement("div", null,
                React.createElement(TicTacToePrompt, { handleClick: this.selectLetter.bind(this), className: this.tableDisplay ? "hide" : "show" }),
                React.createElement(TurnIndicator, { user: this.game.user }),
                React.createElement(TicTacToeTable, { handleClick: this.spaceSelected.bind(this), className: this.tableDisplay ? "show" : "hide" })));
        };
        return TicTacToeGame;
    }(react_1.Component));
    TicTacToeGame = __decorate([
        mobx_react_1.observer
    ], TicTacToeGame);
    var TurnIndicator = (function (_super) {
        __extends(TurnIndicator, _super);
        function TurnIndicator(props) {
            return _super.call(this, props) || this;
        }
        TurnIndicator.prototype.render = function () {
            return (React.createElement("div", { "class": "text-capitalize {this.props.user.isPlaying ? 'usersTurn' : 'computersTurn'}" },
                this.props.user.isPlaying ? "your" : "computer's",
                " Turn"));
        };
        return TurnIndicator;
    }(react_1.Component));
    var User = (function () {
        function User() {
        }
        return User;
    }());
    __decorate([
        mobx_1.observable
    ], User.prototype, "isWinner");
    __decorate([
        mobx_1.observable
    ], User.prototype, "isPlaying");
    var Computer = (function () {
        function Computer(game) {
            this.game = game;
        }
        Computer.prototype.play = function () {
            var spaceNumber;
            spaceNumber = this.getBlockOrWinSpace();
            if (spaceNumber === -1) {
                this.getEmptyCornerSpace();
            }
            if (spaceNumber === -1) {
                this.getEmptySpace();
            }
            this.game.gameTable.setSpace(spaceNumber, this.letterSelection);
            this.isPlaying = false;
        };
        Computer.prototype.getBlockOrWinSpace = function () {
            var spaceNumber = -1;
            this.game.winningCombos.some(function (combo) {
                var emptySpaces = 0;
                combo.map(function (space) {
                    if (space === "") {
                        emptySpaces++;
                    }
                });
                return emptySpaces === 1;
            });
            return spaceNumber;
        };
        Computer.prototype.getEmptyCornerSpace = function () {
            var _this = this;
            var spaceNumber = 0;
            var cornerSpaces = [1, 3, 7, 9];
            var hasEmpty = cornerSpaces.some(function (corner) {
                spaceNumber = corner;
                return _this.game.gameTable.spaces[corner] === "";
            });
            return hasEmpty ? spaceNumber : -1;
        };
        Computer.prototype.getEmptySpace = function () {
            var _this = this;
            var spaceNumber = 0;
            var hasEmpty = this.game.gameTable.spaces.some(function (space) {
                spaceNumber++;
                return _this.game.gameTable.spaces[spaceNumber] === "";
            });
            return hasEmpty ? spaceNumber : -1;
        };
        return Computer;
    }());
    __decorate([
        mobx_1.observable
    ], Computer.prototype, "isWinner");
    __decorate([
        mobx_1.observable
    ], Computer.prototype, "isPlaying");
    var GameTable = (function () {
        function GameTable() {
            this.spaces = ["", "", "", "", "", "", "", "", "", ""];
        }
        GameTable.prototype.setSpace = function (spaceNumber, letter) {
            if (this.spaces[letter] === "") {
                this.spaces[spaceNumber] = letter;
            }
        };
        GameTable.prototype.isFilled = function () {
            var emptySpaces = this.spaces.filter(function (space) {
                return space === "";
            });
            return emptySpaces.length === 0;
        };
        return GameTable;
    }());
    __decorate([
        mobx_1.observable
    ], GameTable.prototype, "spaces");
    var Game = (function () {
        function Game() {
            this.computer = new Computer(this);
            this.user = new User();
            this.gameTable = new GameTable();
            this.ended = false;
            this.winningCombos = [
                [1, 2, 3],
                [1, 4, 7],
                [1, 5, 9],
                [2, 5, 7],
                [3, 6, 9],
                [3, 5, 7],
                [4, 5, 6],
                [7, 8, 9]
            ];
        }
        Game.prototype.hasWon = function (user) {
            var _this = this;
            var winFound;
            return this.winningCombos.some(function (combo) {
                var winFound = combo.every(function (spaceNumber) {
                    return _this.gameTable.spaces[spaceNumber] === user.letterSelection;
                });
                return winFound;
            });
        };
        return Game;
    }());
    //Outcomes
    //Computer wins.
    //You win.
    //Draw.
    //Computer's Turn
    //Your Turn
    ReactDOM.render(React.createElement(TicTacToeGame, null), document.getElementById("gameBoard"));
});
//# sourceMappingURL=index.js.map