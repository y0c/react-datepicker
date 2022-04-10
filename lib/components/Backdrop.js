"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classNames = require("classnames");
var Backdrop = function (_a) {
    var invert = _a.invert, show = _a.show, onClick = _a.onClick;
    return (React.createElement(React.Fragment, null, show && React.createElement("div", { onClick: onClick, className: classNames('rc-backdrop', { invert: invert }) })));
};
exports.default = Backdrop;
//# sourceMappingURL=Backdrop.js.map