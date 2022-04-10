"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ifExistCall = function (func) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return func && func.apply(void 0, args);
};
//# sourceMappingURL=FunctionUtil.js.map