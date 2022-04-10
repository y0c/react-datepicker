"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classNames = require("classnames");
var TodayPanel = function (_a) {
    var today = _a.today, show = _a.show, onClick = _a.onClick;
    return (React.createElement("div", { className: classNames('calendar__panel--today', { 'calendar__panel--show': show }) },
        React.createElement("h2", { onClick: onClick }, today)));
};
exports.default = TodayPanel;
//# sourceMappingURL=TodayPanel.js.map