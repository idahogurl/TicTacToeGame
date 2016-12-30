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
require("react");
require("react-dom");
var mobx = require("mobx");
require("mobx-react");
var React = require("react");
var ReactDOM = require("react-dom");
var TicTacToeTable = (function (_super) {
    __extends(TicTacToeTable, _super);
    function TicTacToeTable(props) {
        return _super.call(this, props) || this;
    }
    TicTacToeTable.prototype.render = function () {
        return (React.createElement("table", { className: this.props.className },
            React.createElement(TicTacToeRow, null),
            React.createElement(TicTacToeRow, null),
            React.createElement(TicTacToeRow, null)));
    };
    return TicTacToeTable;
}(React.Component));
TicTacToeTable = __decorate([
    mobx.observer
], TicTacToeTable);
var TicTacToeRow = (function (_super) {
    __extends(TicTacToeRow, _super);
    function TicTacToeRow() {
        return _super.call(this) || this;
    }
    TicTacToeRow.prototype.render = function () {
        return (React.createElement("tr", null,
            React.createElement(TicTacToeSpace, null),
            React.createElement(TicTacToeSpace, null),
            React.createElement(TicTacToeSpace, null)));
    };
    return TicTacToeRow;
}(React.Component));
var TicTacToeSpace = (function (_super) {
    __extends(TicTacToeSpace, _super);
    function TicTacToeSpace() {
        return _super.apply(this, arguments) || this;
    }
    TicTacToeSpace.prototype.render = function () {
        return (React.createElement("td", null));
    };
    return TicTacToeSpace;
}(React.Component));
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
            " or ",
            React.createElement("a", { className: "letter", onClick: this.props.handleClick }, "O"),
            "?"));
    };
    return TicTacToePrompt;
}(React.Component));
var TicTacToeGame = (function (_super) {
    __extends(TicTacToeGame, _super);
    function TicTacToeGame() {
        var _this = _super.call(this) || this;
        _this.tableDisplay = false;
        return _this;
    }
    TicTacToeGame.prototype.selectLetter = function (e) {
        debugger;
        this.user = $(e.target).html();
        this.computer = this.user === "O" ? "X" : "O";
        this.tableDisplay = true;
    };
    TicTacToeGame.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(TicTacToePrompt, { handleClick: this.selectLetter.bind(this), className: this.tableDisplay ? "hide" : "show" }),
            React.createElement(TicTacToeTable, { className: this.tableDisplay ? "show" : "hide" })));
    };
    return TicTacToeGame;
}(React.Component));
//Outcomes
//Computer wins.
//You win.
//Draw.
//Computer's Turn
//Your Turn
ReactDOM.render(React.createElement(TicTacToeGame, null), document.getElementById("gameBoard"));
