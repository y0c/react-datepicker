"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var IconBase = function (props) { return (React.createElement("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", width: props.size, height: props.size, fill: props.color }, props, { viewBox: "0 0 24 24" }), props.children)); };
exports.default = IconBase;
//# sourceMappingURL=IconBase.js.map