"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var classNames = require("classnames");
var React = require("react");
var TableMatrixView = function (_a) {
    var className = _a.className, matrix = _a.matrix, cell = _a.cell, headers = _a.headers;
    return (React.createElement("table", { className: classNames('calendar__body--table', className) },
        headers && (React.createElement("thead", null,
            React.createElement("tr", null, headers.map(function (v, i) { return (React.createElement("th", { key: i }, v)); })))),
        React.createElement("tbody", null, matrix.map(function (row, i) { return (React.createElement("tr", { key: i }, row.map(function (v, j) { return cell(v, i * matrix[i].length + j); }))); }))));
};
exports.default = TableMatrixView;
//# sourceMappingURL=TableMatrixView.js.map