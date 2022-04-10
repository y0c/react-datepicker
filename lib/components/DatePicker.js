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
var customParseFormat = require("dayjs/plugin/customParseFormat");
var CX = require("classnames");
var Calendar_1 = require("./Calendar");
var TimeContainer_1 = require("./TimeContainer");
var Picker_1 = require("./Picker");
var FunctionUtil_1 = require("../utils/FunctionUtil");
var DateUtil_1 = require("../utils/DateUtil");
var Constant_1 = require("../common/Constant");
var PickerInput_1 = require("./PickerInput");
var SVGIcon_1 = require("./SVGIcon");
var TabValue;
(function (TabValue) {
    TabValue[TabValue["DATE"] = 0] = "DATE";
    TabValue[TabValue["TIME"] = 1] = "TIME";
})(TabValue = exports.TabValue || (exports.TabValue = {}));
var DatePicker = /** @class */ (function (_super) {
    __extends(DatePicker, _super);
    function DatePicker(props) {
        var _this = _super.call(this, props) || this;
        _this.handleDateChange = function (date) {
            var onChange = _this.props.onChange;
            var value = dayjs(date).format(_this.getDateFormat());
            FunctionUtil_1.ifExistCall(onChange, date, value);
            _this.setState(__assign({}, _this.state, { date: date, inputValue: value, selected: [date] }));
        };
        _this.handleTimeChange = function (hour, minute) {
            var onChange = _this.props.onChange;
            var date = _this.state.date;
            var selected = _this.state.selected;
            if (!date) {
                date = dayjs();
                selected = [date];
            }
            date = date.hour(hour).minute(minute);
            var inputValue = date.format(_this.getDateFormat());
            FunctionUtil_1.ifExistCall(onChange, date, inputValue);
            _this.setState(__assign({}, _this.state, { date: date,
                selected: selected,
                inputValue: inputValue }));
        };
        _this.handleInputChange = function (e) {
            var onChange = _this.props.onChange;
            var value = e.currentTarget.value;
            FunctionUtil_1.ifExistCall(onChange, value, undefined);
            _this.setState(__assign({}, _this.state, { inputValue: e.currentTarget.value }));
        };
        _this.handleInputClear = function () {
            var onChange = _this.props.onChange;
            FunctionUtil_1.ifExistCall(onChange, '', undefined);
            _this.setState(__assign({}, _this.state, { inputValue: '' }));
        };
        _this.handleInputBlur = function (e) {
            var date = _this.state.date;
            var value = e.currentTarget.value;
            var parsedDate = dayjs(value, _this.getDateFormat());
            var updateDate;
            updateDate = date;
            if (dayjs(parsedDate).isValid()) {
                updateDate = parsedDate;
            }
            _this.setState(__assign({}, _this.state, { date: updateDate, inputValue: dayjs(updateDate).format(_this.getDateFormat()) }));
        };
        _this.renderInputComponent = function () {
            var _a = _this.props, inputComponent = _a.inputComponent, readOnly = _a.readOnly, disabled = _a.disabled, clear = _a.clear, autoFocus = _a.autoFocus, showDefaultIcon = _a.showDefaultIcon, placeholder = _a.placeholder;
            var inputValue = _this.state.inputValue;
            var inputProps = {
                readOnly: readOnly,
                autoFocus: autoFocus,
                disabled: disabled,
                clear: clear,
                placeholder: placeholder,
                onChange: _this.handleInputChange,
                onClear: _this.handleInputClear,
                onBlur: _this.handleInputBlur,
                value: inputValue,
                icon: showDefaultIcon ? React.createElement(SVGIcon_1.default, { id: "calendar" }) : undefined
            };
            return inputComponent ? inputComponent(__assign({}, inputProps)) : React.createElement(PickerInput_1.default, __assign({}, inputProps));
        };
        _this.handleTab = function (val) { return function () {
            _this.setState(__assign({}, _this.state, { tabValue: val }));
        }; };
        _this.renderTabMenu = function () {
            var tabValue = _this.state.tabValue;
            var renderButton = function (type, label, icon) { return (React.createElement("button", { className: CX({
                    active: tabValue === type,
                }), onClick: _this.handleTab(type), type: "button" },
                React.createElement(SVGIcon_1.default, { id: icon }),
                label)); };
            return (React.createElement("div", { className: "picker__container__tab" },
                renderButton(TabValue.DATE, 'DATE', 'calendar'),
                renderButton(TabValue.TIME, 'TIME', 'time')));
        };
        _this.renderCalendar = function (actions) {
            var _a = _this.state, selected = _a.selected, date = _a.date;
            return (React.createElement(Calendar_1.default, __assign({}, _this.props, { base: date, onChange: function (e) {
                    _this.handleDateChange(e);
                    actions.hide();
                }, selected: selected })));
        };
        _this.renderTime = function () {
            var date = _this.state.date || dayjs();
            return (React.createElement(TimeContainer_1.default, { hour: date.hour(), minute: date.minute(), onChange: _this.handleTimeChange }));
        };
        _this.renderContents = function (actions) {
            var _a = _this.props, includeTime = _a.includeTime, showTimeOnly = _a.showTimeOnly;
            var tabValue = _this.state.tabValue;
            var component;
            component = React.createElement("div", { className: "picker__container__calonly" }, _this.renderCalendar(actions));
            if (showTimeOnly) {
                component = React.createElement("div", { className: "picker__container__timeonly" }, _this.renderTime());
            }
            if (includeTime) {
                component = (React.createElement("div", { className: "picker__container__include-time" },
                    _this.renderTabMenu(),
                    tabValue === TabValue.DATE ? _this.renderCalendar(actions) : _this.renderTime()));
            }
            return component;
        };
        dayjs.extend(customParseFormat);
        var _a = _this.props, initialDate = _a.initialDate, includeTime = _a.includeTime, showTimeOnly = _a.showTimeOnly;
        var selected = [];
        var date;
        if (initialDate) {
            date = initialDate;
            selected.push(date);
        }
        if (includeTime && showTimeOnly) {
            throw new Error('incldueTime & showTimeOnly cannot be used together');
        }
        _this.state = {
            date: date,
            selected: selected,
            tabValue: TabValue.DATE,
            inputValue: DateUtil_1.formatDate(date, _this.getDateFormat()),
        };
        return _this;
    }
    DatePicker.prototype.getDateFormat = function () {
        var _a = this.props, dateFormat = _a.dateFormat, includeTime = _a.includeTime, showTimeOnly = _a.showTimeOnly;
        if (!dateFormat) {
            if (includeTime) {
                return Constant_1.DatePickerDefaults.dateTimeFormat;
            }
            if (showTimeOnly) {
                return Constant_1.DatePickerDefaults.timeFormat;
            }
            return Constant_1.DatePickerDefaults.dateFormat;
        }
        return dateFormat;
    };
    DatePicker.prototype.render = function () {
        var _this = this;
        var _a = this.props, includeTime = _a.includeTime, portal = _a.portal, direction = _a.direction, disabled = _a.disabled, readOnly = _a.readOnly;
        return (React.createElement(Picker_1.default, { portal: portal, direction: direction, readOnly: readOnly, disabled: disabled, className: CX({ include__time: includeTime }), renderTrigger: function () { return _this.renderInputComponent(); }, renderContents: function (_a) {
                var actions = _a.actions;
                return _this.renderContents(actions);
            } }));
    };
    DatePicker.defaultProps = {
        includeTime: false,
        showMonthCnt: 1,
        locale: Constant_1.DatePickerDefaults.locale,
        portal: false,
        showDefaultIcon: false,
    };
    return DatePicker;
}(React.Component));
exports.default = DatePicker;
//# sourceMappingURL=DatePicker.js.map