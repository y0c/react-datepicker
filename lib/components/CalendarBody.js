"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var dayjs = require("dayjs");
var _types_1 = require("../common/@types");
var Constant_1 = require("../common/Constant");
var DateUtil_1 = require("../utils/DateUtil");
var DayView_1 = require("./DayView");
var TableCell_1 = require("./TableCell");
var TableMatrixView_1 = require("./TableMatrixView");
var YEAR_VIEW_CLASS = 'calendar__year';
var MONTH_VIEW_CLASS = 'calendar__month';
var buildMatrixView = function (matrix, className, onClick) {
    return (React.createElement(TableMatrixView_1.default, { matrix: matrix, cell: function (value, key) { return (React.createElement(TableCell_1.default, { key: key, className: className, text: value, onClick: onClick(key, value) })); } }));
};
var CalendarBody = /** @class */ (function (_super) {
    __extends(CalendarBody, _super);
    function CalendarBody() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CalendarBody.prototype.render = function () {
        var _a;
        var _b = this.props, current = _b.current, onClick = _b.onClick, locale = _b.locale;
        var viewMap = (_a = {},
            _a[_types_1.IDatePicker.ViewMode.YEAR] = buildMatrixView(DateUtil_1.getYearMatrix(dayjs(current).year()), YEAR_VIEW_CLASS, function (_, v) { return function () { return onClick(v); }; }),
            _a[_types_1.IDatePicker.ViewMode.MONTH] = buildMatrixView(DateUtil_1.getMonthMatrix(locale), MONTH_VIEW_CLASS, function (k, _) { return function () { return onClick(String(k)); }; }),
            _a[_types_1.IDatePicker.ViewMode.DAY] = React.createElement(DayView_1.default, __assign({}, this.props)),
            _a);
        return React.createElement("div", { className: "calendar__body" }, viewMap[this.props.viewMode]);
    };
    CalendarBody.defaultProps = {
        viewMode: _types_1.IDatePicker.ViewMode.DAY,
        locale: Constant_1.DatePickerDefaults.locale,
    };
    return CalendarBody;
}(React.Component));
exports.default = CalendarBody;
//# sourceMappingURL=CalendarBody.js.map