"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var FunctionUtil_1 = require("../utils/FunctionUtil");
var Cell = function (_a) {
    var className = _a.className, text = _a.text, subText = _a.subText, onClick = _a.onClick, onMouseOver = _a.onMouseOver;
    return (React.createElement("td", { onClick: function () { return FunctionUtil_1.ifExistCall(onClick, text); }, onMouseOver: function () { return FunctionUtil_1.ifExistCall(onMouseOver, text); }, className: className },
        React.createElement("div", null, text),
        subText && React.createElement("span", { className: "sub__text" }, subText)));
};
exports.default = Cell;
//# sourceMappingURL=TableCell.js.map