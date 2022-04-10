"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _types_1 = require("../common/@types");
var convertPx = function (value) { return value + "px"; };
/**
 * Getting Div position as far as distance
 * @param node
 * @param direction
 * @param distance
 */
exports.getDivPosition = function (node, direction, height, distance) {
    if (direction === void 0) { direction = _types_1.IDatePicker.PickerDirection.BOTTOM; }
    if (distance === void 0) { distance = 5; }
    if (!node)
        return { left: '', top: '', bottom: '' };
    var top = 0;
    var left = 0;
    switch (direction) {
        case _types_1.IDatePicker.PickerDirection.BOTTOM:
            top = node.offsetTop + node.offsetHeight + distance;
            left = node.offsetLeft;
            break;
        case _types_1.IDatePicker.PickerDirection.TOP:
            top = node.offsetTop - height - distance;
            left = node.offsetLeft;
            break;
    }
    return {
        top: convertPx(top),
        left: convertPx(left),
    };
};
exports.getDomHeight = function (node) {
    return node ? node.clientHeight : 0;
};
//# sourceMappingURL=DOMUtil.js.map