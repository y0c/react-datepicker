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
var classNames = require("classnames");
var SVGIcon_1 = require("./SVGIcon");
var PickerInput = /** @class */ (function (_super) {
    __extends(PickerInput, _super);
    function PickerInput(props) {
        var _this = _super.call(this, props) || this;
        _this.handleClear = function (e) {
            var onClear = _this.props.onClear;
            if (onClear)
                onClear();
            e.stopPropagation();
        };
        _this.renderInput = function () {
            var _a = _this.props, _b = _a.readOnly, readOnly = _b === void 0 ? false : _b, _c = _a.disabled, disabled = _c === void 0 ? false : _c, _d = _a.value, value = _d === void 0 ? '' : _d, icon = _a.icon, onChange = _a.onChange, onClick = _a.onClick, onBlur = _a.onBlur, placeholder = _a.placeholder;
            return (React.createElement("input", { ref: _this.inputRef, className: "picker-input__text", type: "text", value: value, readOnly: readOnly, disabled: disabled, onChange: onChange, onClick: onClick, onBlur: onBlur, placeholder: placeholder, style: {
                    paddingLeft: icon ? '32px' : '10px',
                } }));
        };
        _this.renderClear = function () {
            return (React.createElement("span", { className: "picker-input__clear", onClick: _this.handleClear },
                React.createElement(SVGIcon_1.default, { id: "clear" })));
        };
        _this.inputRef = React.createRef();
        return _this;
    }
    PickerInput.prototype.componentDidMount = function () {
        var current = this.inputRef.current;
        var autoFocus = this.props.autoFocus;
        if (current && autoFocus) {
            current.focus();
        }
    };
    PickerInput.prototype.render = function () {
        var _a = this.props, clear = _a.clear, icon = _a.icon, className = _a.className;
        return (React.createElement("div", { className: classNames('picker-input', className) },
            icon && React.createElement("span", { className: "picker-input__icon" }, icon),
            this.renderInput(),
            clear && this.renderClear()));
    };
    return PickerInput;
}(React.Component));
exports.default = PickerInput;
//# sourceMappingURL=PickerInput.js.map