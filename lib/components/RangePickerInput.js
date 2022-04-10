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
var React = require("react");
var PickerInput_1 = require("./PickerInput");
var FunctionUtil_1 = require("../utils/FunctionUtil");
var SVGIcon_1 = require("./SVGIcon");
var FieldType;
(function (FieldType) {
    FieldType[FieldType["START"] = 0] = "START";
    FieldType[FieldType["END"] = 1] = "END";
})(FieldType = exports.FieldType || (exports.FieldType = {}));
var RangePickerInput = /** @class */ (function (_super) {
    __extends(RangePickerInput, _super);
    function RangePickerInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleChange = function (fieldType) { return function (e) {
            return FunctionUtil_1.ifExistCall(_this.props.onChange, fieldType, e.currentTarget.value);
        }; };
        _this.handleBlur = function (fieldType) { return function (e) {
            return FunctionUtil_1.ifExistCall(_this.props.onBlur, fieldType, e.currentTarget.value);
        }; };
        _this.handleClick = function (fieldType) { return function () { return FunctionUtil_1.ifExistCall(_this.props.onClick, fieldType); }; };
        _this.handleClear = function (fieldType) { return function () { return FunctionUtil_1.ifExistCall(_this.props.onClear, fieldType); }; };
        _this.renderStartInput = function () {
            var _a = _this.props, startValue = _a.startValue, startPlaceholder = _a.startPlaceholder;
            return _this.renderPickerInput(FieldType.START, startValue, startPlaceholder);
        };
        _this.renderEndInput = function () {
            var _a = _this.props, endValue = _a.endValue, endPlaceholder = _a.endPlaceholder;
            return _this.renderPickerInput(FieldType.END, endValue, endPlaceholder);
        };
        _this.renderPickerInput = function (fieldType, value, placeholder) {
            var _a = _this.props, readOnly = _a.readOnly, disabled = _a.disabled, clear = _a.clear;
            return (React.createElement(PickerInput_1.default, { value: value, readOnly: readOnly, disabled: disabled, clear: clear, className: "range", onClear: _this.handleClear(fieldType), onClick: _this.handleClick(fieldType), onChange: _this.handleChange(fieldType), onBlur: _this.handleBlur(fieldType), placeholder: placeholder }));
        };
        return _this;
    }
    RangePickerInput.prototype.render = function () {
        return (React.createElement("div", { className: "range-picker-input" },
            React.createElement("span", { className: "range-picker-input__start" }, this.renderStartInput()),
            React.createElement("span", { className: "range-picker-input__icon" },
                React.createElement(SVGIcon_1.default, { id: "right-arrow" })),
            React.createElement("span", { className: "range-picker-input__end" }, this.renderEndInput())));
    };
    return RangePickerInput;
}(React.Component));
exports.default = RangePickerInput;
//# sourceMappingURL=RangePickerInput.js.map