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
            return (React.createElement("table", { id: "gameTable", className: "center-block", disabled: this.props.game.computer.isPlaying ? "disabled" : "" },
                React.createElement("tbody", null,
                    React.createElement(TicTacToeRow, { spaceNumberBegin: "1", gameBoard: this.props.game.gameTable, handleClick: this.props.handleClick }),
                    React.createElement(TicTacToeRow, { spaceNumberBegin: "4", gameBoard: this.props.game.gameTable, handleClick: this.props.handleClick }),
                    React.createElement(TicTacToeRow, { spaceNumberBegin: "7", gameBoard: this.props.game.gameTable, handleClick: this.props.handleClick }))));
        };
        return TicTacToeTable;
    }(react_1.Component));
    TicTacToeTable = __decorate([
        mobx_react_1.observer
    ], TicTacToeTable);
    var TicTacToeRow = (function (_super) {
        __extends(TicTacToeRow, _super);
        function TicTacToeRow() {
            return _super.call(this) || this;
        }
        TicTacToeRow.prototype.render = function () {
            var beginNumber = parseInt(this.props.spaceNumberBegin);
            return (React.createElement("tr", null,
                React.createElement(TicTacToeSpace, { spaceNumber: beginNumber, handleClick: this.props.handleClick, letter: this.props.gameBoard.spaces[beginNumber] }),
                React.createElement(TicTacToeSpace, { spaceNumber: beginNumber + 1, handleClick: this.props.handleClick, letter: this.props.gameBoard.spaces[beginNumber + 1] }),
                React.createElement(TicTacToeSpace, { spaceNumber: beginNumber + 2, handleClick: this.props.handleClick, letter: this.props.gameBoard.spaces[beginNumber + 2] })));
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
            return (React.createElement("td", { id: this.props.spaceNumber, className: "gameSpace", onClick: this.props.handleClick }, this.props.letter));
        };
        return TicTacToeSpace;
    }(react_1.Component));
    var TicTacToePrompt = (function (_super) {
        __extends(TicTacToePrompt, _super);
        function TicTacToePrompt(props) {
            return _super.call(this, props) || this;
        }
        TicTacToePrompt.prototype.render = function () {
            return (React.createElement("div", { id: "prompt", className: this.props.className },
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
            debugger;
            var spaceSelection = $(e.target).attr("id");
            if (!this.game.computer.isPlaying) {
                this.game.gameTable.setSpace(spaceSelection, this.game.user.letterSelection);
                this.game.user.isWinner = this.game.hasWon(this.game.user);
                this.game.ended = this.game.gameTable.isFilled() || this.game.user.isWinner;
                if (!this.game.ended) {
                    this.game.user.isPlaying = false;
                    this.game.computer.isPlaying = true;
                    var self_1 = this;
                    setTimeout(function () {
                        self_1.game.computer.play();
                        self_1.game.computer.isWinner = self_1.game.hasWon(self_1.game.computer);
                        self_1.game.ended = self_1.game.gameTable.isFilled() || self_1.game.computer.isWinner;
                    }, 2000);
                }
            }
        };
        TicTacToeGame.prototype.render = function () {
            debugger;
            return (React.createElement("div", null,
                React.createElement(TicTacToePrompt, { handleClick: this.selectLetter.bind(this), className: this.tableDisplay ? "hide" : "show" }),
                React.createElement(GameOverNotification, { message: this.game.user.isWinner ? "You win." : this.game.computer.isWinner ? "Computer wins." : "Draw", className: this.game.ended ? "show" : "hide" }),
                React.createElement("div", { id: "chalkboard", className: this.tableDisplay && !this.game.ended ? "show" : "hide" },
                    React.createElement(TurnIndicator, { computer: this.game.computer }),
                    React.createElement(TicTacToeTable, { game: this.game, handleClick: this.spaceSelected.bind(this) }))));
        };
        return TicTacToeGame;
    }(react_1.Component));
    __decorate([
        mobx_1.observable
    ], TicTacToeGame.prototype, "tableDisplay");
    TicTacToeGame = __decorate([
        mobx_react_1.observer
    ], TicTacToeGame);
    var GameOverNotification = (function (_super) {
        __extends(GameOverNotification, _super);
        function GameOverNotification(props) {
            return _super.call(this, props) || this;
        }
        GameOverNotification.prototype.render = function () {
            return (React.createElement("div", { className: this.props.className, id: "prompt" },
                "Game Over. ",
                this.props.message,
                React.createElement("div", null,
                    React.createElement("a", { href: "index.html" }, "Play again?"))));
        };
        return GameOverNotification;
    }(react_1.Component));
    GameOverNotification = __decorate([
        mobx_react_1.observer
    ], GameOverNotification);
    var TurnIndicator = (function (_super) {
        __extends(TurnIndicator, _super);
        function TurnIndicator(props) {
            return _super.call(this, props) || this;
        }
        TurnIndicator.prototype.render = function () {
            return (React.createElement("div", { className: !this.props.computer.isPlaying ? "usersTurn" : "computersTurn" },
                !this.props.computer.isPlaying ? "your" : "computer's",
                " Turn"));
        };
        return TurnIndicator;
    }(react_1.Component));
    TurnIndicator = __decorate([
        mobx_react_1.observer
    ], TurnIndicator);
    var User = (function () {
        function User() {
            this.isWinner = false;
            this.isPlaying = true;
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
            this.isWinner = false;
            this.isPlaying = false;
        }
        Computer.prototype.play = function () {
            var spaceNumber;
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
        };
        Computer.prototype.getWinSpace = function () {
            var _this = this;
            var spaceNumber;
            var spaceFound = this.game.winningCombos.some(function (combo) {
                var emptySpaces = 0;
                var computerSpaces = 0;
                combo.map(function (space) {
                    var value = _this.game.gameTable.spaces[space];
                    if (value === "") {
                        spaceNumber = space;
                        emptySpaces++;
                    }
                    else if (value === _this.letterSelection) {
                        computerSpaces++;
                    }
                });
                return emptySpaces === 1 && computerSpaces === 2;
            });
            if (!spaceFound)
                spaceNumber = -1;
            return spaceNumber;
        };
        Computer.prototype.getBlockSpace = function () {
            var _this = this;
            var spaceNumber;
            var spaceFound = this.game.winningCombos.some(function (combo) {
                var emptySpaces = 0;
                var userSpaces = 0;
                combo.map(function (space) {
                    var value = _this.game.gameTable.spaces[space];
                    if (value === "") {
                        spaceNumber = space;
                        emptySpaces++;
                    }
                    else if (value !== _this.letterSelection) {
                        userSpaces++;
                    }
                });
                return emptySpaces === 1 && userSpaces === 2;
            });
            if (!spaceFound)
                spaceNumber = -1;
            return spaceNumber;
        };
        Computer.prototype.getCornerSpace = function () {
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
            this.spaces = ["-1", "", "", "", "", "", "", "", "", ""]; //-1 simplifies zero-indexing
        }
        GameTable.prototype.setSpace = function (spaceNumber, letter) {
            if (this.spaces[spaceNumber] === "") {
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
                [2, 5, 8],
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
    __decorate([
        mobx_1.observable
    ], Game.prototype, "ended");
    //Outcomes
    //Computer wins.
    //You win.
    //Draw.
    //Computer's Turn
    //Your Turn
    ReactDOM.render(React.createElement(TicTacToeGame, null), document.getElementById("gameBoard"));
});
//# sourceMappingURL=index.js.map