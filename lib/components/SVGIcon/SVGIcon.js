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
var Icons_1 = require("./Icons");
var SVGIcon = function (props) {
    var iconMap = {
        'calendar': Icons_1.Calendar,
        'clear': Icons_1.Clear,
        'time': Icons_1.Time,
        'left-arrow': Icons_1.LeftArrow,
        'right-arrow': Icons_1.RightArrow,
        'down': Icons_1.Down,
        'up': Icons_1.Up,
    };
    var Icon = iconMap[props.id];
    return React.createElement(Icon, __assign({ className: "icon-" + props.id }, props));
};
SVGIcon.defaultProps = {
    size: '16',
    color: 'currentColor',
};
exports.default = SVGIcon;
//# sourceMappingURL=SVGIcon.js.map