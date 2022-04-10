"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ArrayUtil_1 = require("./ArrayUtil");
var dayjs = require("dayjs");
var LocaleUtil_1 = require("./LocaleUtil");
exports.getDayMatrix = function (year, month) {
    var date = dayjs()
        .year(year)
        .month(month);
    var startOfMonth = date.startOf('month').date();
    var endOfMonth = date.endOf('month').date();
    var startDay = date.startOf('month').day();
    var remain = (startDay + endOfMonth) % 7;
    return ArrayUtil_1.chunk(ArrayUtil_1.repeat(' ', startDay).concat(ArrayUtil_1.range(startOfMonth, endOfMonth + 1).map(function (v) { return "" + v; }), (7 - remain === 7 ? [] : ArrayUtil_1.repeat(' ', 7 - remain))), 7);
};
exports.getMonthMatrix = function (locale) {
    return ArrayUtil_1.chunk(LocaleUtil_1.getMonthShort(locale), 3);
};
exports.getYearMatrix = function (year) {
    return ArrayUtil_1.chunk(ArrayUtil_1.range(year - 4, year + 5).map(function (v) { return "" + v; }), 3);
};
exports.isDayEqual = function (day1, day2) {
    if (!day1 || !day2)
        return false;
    return dayjs(day1).isSame(day2, 'date');
};
exports.isDayAfter = function (day1, day2) {
    return dayjs(day1).isAfter(day2, 'date');
};
exports.isDayBefore = function (day1, day2) {
    return dayjs(day1).isBefore(day2, 'date');
};
exports.isDayRange = function (date, start, end) {
    if (!start || !end)
        return false;
    return exports.isDayAfter(date, start) && exports.isDayBefore(date, end);
};
exports.formatDate = function (date, format) {
    if (date === undefined)
        return '';
    return dayjs(date).format(format);
};
//# sourceMappingURL=DateUtil.js.map