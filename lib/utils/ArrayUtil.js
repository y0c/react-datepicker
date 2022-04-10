"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chunk = function (arr, n) {
    var result = [];
    var i = 0;
    while (i < arr.length / n) {
        result.push(arr.slice(i * n, i * n + n));
        i += 1;
    }
    return result;
};
exports.range = function (n1, n2) {
    var result = [];
    var first = !n2 ? 0 : n1;
    var last = n2;
    if (!last) {
        last = n1;
    }
    while (first < last) {
        result.push(first);
        first += 1;
    }
    return result;
};
exports.repeat = function (el, n) {
    return exports.range(n).map(function () { return el; });
};
//# sourceMappingURL=ArrayUtil.js.map