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
Object.defineProperty(exports, "__esModule", { value: true });
var classNames = require("classnames");
var dayjs = require("dayjs");
var React = require("react");
var Constant_1 = require("../common/Constant");
var TableCell_1 = require("./TableCell");
var TableMatrixView_1 = require("./TableMatrixView");
var FunctionUtil_1 = require("../utils/FunctionUtil");
var LocaleUtil_1 = require("../utils/LocaleUtil");
var DateUtil_1 = require("../utils/DateUtil");
var DayView = /** @class */ (function (_super) {
    __extends(DayView, _super);
    function DayView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getDayClass = function (date) {
            var _a = _this.props, current = _a.current, customDayClass = _a.customDayClass, startDay = _a.startDay, endDay = _a.endDay, selected = _a.selected, disableDay = _a.disableDay;
            var currentDate = dayjs(current).date(parseInt(date, 10));
            var classArr = [];
            if (!date.trim()) {
                return '';
            }
            if (customDayClass !== undefined) {
                var customClass = customDayClass(currentDate);
                classArr = classArr.concat(typeof customClass === 'string' ? [customClass] : customClass);
            }
            var dayClass = classNames('calendar__day', "calendar__day--" + dayjs(currentDate).day(), classArr, {
                'calendar__day--end': DateUtil_1.isDayEqual(currentDate, endDay),
                'calendar__day--range': DateUtil_1.isDayRange(currentDate, startDay, endDay),
                'calendar__day--selected': _this.isIncludeDay(date, selected),
                'calendar__day--disabled': disableDay ? disableDay(currentDate) : false,
                'calendar__day--start': DateUtil_1.isDayEqual(currentDate, startDay),
                'calendar__day--today': DateUtil_1.isDayEqual(currentDate, dayjs()),
            });
            return dayClass;
        };
        _this.getCustomText = function (date) {
            var _a = _this.props, current = _a.current, customDayText = _a.customDayText;
            var currentDate = dayjs(current).date(parseInt(date, 10));
            if (!date.trim()) {
                return '';
            }
            if (!customDayText) {
                return '';
            }
            return customDayText(currentDate);
        };
        _this.isIncludeDay = function (date, dates) {
            var current = _this.props.current;
            if (dates === undefined) {
                return false;
            }
            return dates.some(function (v) { return DateUtil_1.isDayEqual(dayjs(current).date(parseInt(date, 10)), v); });
        };
        _this.handleClick = function (date) {
            var _a = _this.props, current = _a.current, disableDay = _a.disableDay;
            var currentDate = dayjs(current).date(parseInt(date, 10));
            if (!(disableDay && disableDay(currentDate))) {
                FunctionUtil_1.ifExistCall(_this.props.onClick, date);
            }
        };
        _this.handleMouseOver = function (date) {
            var _a = _this.props, onMouseOver = _a.onMouseOver, current = _a.current;
            FunctionUtil_1.ifExistCall(onMouseOver, dayjs(current).date(parseInt(date, 10)));
        };
        return _this;
    }
    DayView.prototype.render = function () {
        var _this = this;
        var _a = this.props, current = _a.current, locale = _a.locale;
        var dayMatrix = DateUtil_1.getDayMatrix(dayjs(current).year(), dayjs(current).month());
        var weekdays = LocaleUtil_1.getWeekDays(locale);
        return (React.createElement(TableMatrixView_1.default, { headers: weekdays, matrix: dayMatrix, cell: function (date, key) { return (React.createElement(TableCell_1.default, { className: _this.getDayClass(date), subText: _this.getCustomText(date), onClick: _this.handleClick, onMouseOver: _this.handleMouseOver, text: date, key: key })); } }));
    };
    DayView.defaultProps = {
        locale: Constant_1.DatePickerDefaults.locale,
    };
    return DayView;
}(React.Component));
exports.default = DayView;
//# sourceMappingURL=DayView.js.map