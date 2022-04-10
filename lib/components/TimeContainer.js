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
var TimeInput_1 = require("./TimeInput");
var FunctionUtil_1 = require("../utils/FunctionUtil");
var TimeContainer = /** @class */ (function (_super) {
    __extends(TimeContainer, _super);
    function TimeContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            hour: _this.props.hour || 0,
            minute: _this.props.minute || 0,
        };
        _this.handleChange = function (item) { return function (e) {
            var _a;
            var min = 0;
            var max = item === 'hour' ? 23 : 59;
            var value = parseInt(e.currentTarget.value, 10);
            if (isNaN(value)) {
                value = 0;
            }
            if (max < value) {
                value = max;
            }
            if (min > value) {
                value = min;
            }
            _this.setState(__assign({}, _this.state, (_a = {}, _a[item] = value, _a)), function () { return _this.invokeOnChange(); });
        }; };
        _this.handleUp = function (item) { return function () {
            var _a;
            var max = item === 'hour' ? 23 : 59;
            var value = _this.state[item];
            _this.setState(__assign({}, _this.state, (_a = {}, _a[item] = Math.min(value + 1, max), _a)), function () { return _this.invokeOnChange(); });
        }; };
        _this.handleDown = function (item) { return function () {
            var _a;
            var min = 0;
            var value = _this.state[item];
            _this.setState(__assign({}, _this.state, (_a = {}, _a[item] = Math.max(value - 1, min), _a)), function () { return _this.invokeOnChange(); });
        }; };
        _this.handleBlur = function () {
            var onBlur = _this.props.onBlur;
            var _a = _this.state, hour = _a.hour, minute = _a.minute;
            FunctionUtil_1.ifExistCall(onBlur, hour, minute);
        };
        _this.invokeOnChange = function () {
            var onChange = _this.props.onChange;
            var _a = _this.state, hour = _a.hour, minute = _a.minute;
            FunctionUtil_1.ifExistCall(onChange, hour, minute);
        };
        return _this;
    }
    TimeContainer.prototype.render = function () {
        var _a = this.state, hour = _a.hour, minute = _a.minute;
        return (React.createElement("div", { className: "time__container" },
            React.createElement(TimeInput_1.default, { onUp: this.handleUp('hour'), onDown: this.handleDown('hour'), onChange: this.handleChange('hour'), onBlur: this.handleBlur, value: hour }),
            React.createElement("div", { className: "time__container__div" }, ":"),
            React.createElement(TimeInput_1.default, { onUp: this.handleUp('minute'), onDown: this.handleDown('minute'), onChange: this.handleChange('minute'), onBlur: this.handleBlur, value: minute })));
    };
    return TimeContainer;
}(React.Component));
exports.default = TimeContainer;
//# sourceMappingURL=TimeContainer.js.map