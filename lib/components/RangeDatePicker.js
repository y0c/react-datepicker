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
var DateUtil_1 = require("../utils/DateUtil");
var Constant_1 = require("../common/Constant");
var Picker_1 = require("./Picker");
var RangePickerInput_1 = require("./RangePickerInput");
var Calendar_1 = require("./Calendar");
var FunctionUtil_1 = require("../utils/FunctionUtil");
var RangeDatePicker = /** @class */ (function (_super) {
    __extends(RangeDatePicker, _super);
    function RangeDatePicker(props) {
        var _this = _super.call(this, props) || this;
        _this.handleDateChange = function (actions) { return function (date) {
            var _a = _this.props, onChange = _a.onChange, dateFormat = _a.dateFormat;
            var _b = _this.state, start = _b.start, end = _b.end;
            var startDate;
            var endDate;
            startDate = start;
            endDate = end;
            if (!start) {
                startDate = date;
            }
            else {
                if (end) {
                    startDate = date;
                    endDate = undefined;
                }
                else {
                    if (!DateUtil_1.isDayBefore(date, start)) {
                        endDate = date;
                    }
                    else {
                        startDate = date;
                    }
                }
            }
            FunctionUtil_1.ifExistCall(onChange, startDate, endDate);
            _this.setState(__assign({}, _this.state, { start: startDate, end: endDate, startValue: DateUtil_1.formatDate(startDate, dateFormat), endValue: DateUtil_1.formatDate(endDate, dateFormat) }), function () {
                if (_this.state.start && _this.state.end) {
                    actions.hide();
                }
            });
        }; };
        _this.handleInputChange = function (fieldType, value) {
            var _a;
            var key = fieldType === RangePickerInput_1.FieldType.START ? 'startValue' : 'endValue';
            _this.setState(__assign({}, _this.state, (_a = {}, _a[key] = value, _a)));
        };
        _this.handleMouseOver = function (date) {
            _this.setState(__assign({}, _this.state, { hoverDate: date }));
        };
        _this.handleInputBlur = function (fieldType, value) {
            var dateFormat = _this.props.dateFormat;
            var _a = _this.state, start = _a.start, end = _a.end;
            var parsedDate = dayjs(value, dateFormat);
            var startDate = start;
            var endDate = end;
            if (parsedDate.isValid() && dateFormat.length === value.length) {
                if (fieldType === RangePickerInput_1.FieldType.END) {
                    endDate = parsedDate;
                }
                else if (fieldType === RangePickerInput_1.FieldType.START) {
                    startDate = parsedDate;
                }
            }
            if (startDate && endDate) {
                if (DateUtil_1.isDayBefore(endDate, startDate) || DateUtil_1.isDayAfter(startDate, endDate)) {
                    // Swapping Date
                    var temp = void 0;
                    temp = startDate;
                    startDate = endDate;
                    endDate = temp;
                }
            }
            _this.setState(__assign({}, _this.state, { start: startDate, end: endDate, startValue: DateUtil_1.formatDate(startDate, dateFormat), endValue: DateUtil_1.formatDate(endDate, dateFormat) }));
        };
        _this.handleCalendarText = function (date) {
            var _a = _this.props, startText = _a.startText, endText = _a.endText, customDayText = _a.customDayText;
            var _b = _this.state, start = _b.start, end = _b.end;
            if (DateUtil_1.isDayEqual(start, date))
                return startText;
            if (DateUtil_1.isDayEqual(end, date))
                return endText;
            FunctionUtil_1.ifExistCall(customDayText, date);
            return '';
        };
        _this.handleCalendarClass = function (date) {
            var customDayClass = _this.props.customDayClass;
            var _a = _this.state, start = _a.start, end = _a.end, hoverDate = _a.hoverDate;
            if (start && !end && hoverDate) {
                if (DateUtil_1.isDayRange(date, start, hoverDate)) {
                    return 'calendar__day--range';
                }
            }
            FunctionUtil_1.ifExistCall(customDayClass, date);
            return '';
        };
        _this.handleInputClear = function (fieldType) {
            var onClear = _this.props.onClear;
            FunctionUtil_1.ifExistCall(onClear, fieldType);
            if (fieldType === RangePickerInput_1.FieldType.START) {
                _this.setState(__assign({}, _this.state, { start: undefined, startValue: '' }));
            }
            else if (fieldType === RangePickerInput_1.FieldType.END) {
                _this.setState(__assign({}, _this.state, { end: undefined, endValue: '' }));
            }
        };
        _this.renderRangePickerInput = function () {
            var _a = _this.props, startPlaceholder = _a.startPlaceholder, endPlaceholder = _a.endPlaceholder, readOnly = _a.readOnly, disabled = _a.disabled, clear = _a.clear;
            var _b = _this.state, startValue = _b.startValue, endValue = _b.endValue;
            return (React.createElement(RangePickerInput_1.default, { startPlaceholder: startPlaceholder, readOnly: readOnly, disabled: disabled, clear: clear, endPlaceholder: endPlaceholder, startValue: startValue, endValue: endValue, onChange: _this.handleInputChange, onBlur: _this.handleInputBlur, onClear: _this.handleInputClear }));
        };
        _this.renderCalendar = function (actions) {
            var _a = _this.props, showMonthCnt = _a.showMonthCnt, initialDate = _a.initialDate, wrapper = _a.wrapper;
            var _b = _this.state, start = _b.start, end = _b.end;
            var component;
            var calendar = (React.createElement(Calendar_1.default, __assign({}, _this.props, { base: start || initialDate, startDay: start, endDay: end, showMonthCnt: showMonthCnt, onChange: _this.handleDateChange(actions), onMouseOver: _this.handleMouseOver, customDayText: _this.handleCalendarText, customDayClass: _this.handleCalendarClass })));
            component = calendar;
            if (wrapper) {
                component = wrapper(calendar);
            }
            return component;
        };
        var dateFormat = props.dateFormat, initialStartDate = props.initialStartDate, initialEndDate = props.initialEndDate;
        var start = initialStartDate;
        var end = initialEndDate;
        _this.state = {
            start: start,
            end: end,
            startValue: DateUtil_1.formatDate(start, dateFormat),
            endValue: DateUtil_1.formatDate(end, dateFormat),
        };
        return _this;
    }
    RangeDatePicker.prototype.render = function () {
        var _this = this;
        var _a = this.props, portal = _a.portal, direction = _a.direction, disabled = _a.disabled, readOnly = _a.readOnly;
        return (React.createElement(Picker_1.default, { portal: portal, direction: direction, readOnly: readOnly, disabled: disabled, renderTrigger: function () { return _this.renderRangePickerInput(); }, renderContents: function (_a) {
                var actions = _a.actions;
                return _this.renderCalendar(actions);
            } }));
    };
    RangeDatePicker.defaultProps = {
        dateFormat: Constant_1.DatePickerDefaults.dateFormat,
        portal: false,
        initialDate: dayjs(),
        showMonthCnt: 2,
        startText: '',
        endText: '',
    };
    return RangeDatePicker;
}(React.Component));
exports.default = RangeDatePicker;
//# sourceMappingURL=RangeDatePicker.js.map