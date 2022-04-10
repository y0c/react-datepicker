"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dayjs = require("dayjs");
var ArrayUtil_1 = require("../utils/ArrayUtil");
var localeData = require("dayjs/plugin/localeData");
var localizedFormat = require("dayjs/plugin/localizedFormat");
var weekday = require("dayjs/plugin/weekday");
dayjs.extend(localeData);
dayjs.extend(localizedFormat);
dayjs.extend(weekday);
exports.getMonthShort = function (locale) {
    dayjs.locale(locale);
    return ArrayUtil_1.range(0, 12).map(function (v) {
        return dayjs()
            .localeData()
            .monthsShort(dayjs().month(v));
    });
};
exports.getWeekDays = function (locale) {
    dayjs.locale(locale);
    return ArrayUtil_1.range(7).map(function (v) {
        return dayjs()
            .localeData()
            .weekdaysShort(dayjs().weekday(v));
    });
};
exports.getToday = function (locale) {
    return dayjs()
        .locale(locale)
        .format('LL');
};
//# sourceMappingURL=LocaleUtil.js.map