import * as dayjs from 'dayjs';
import { range } from 'lodash';
import * as localeData from 'dayjs/plugin/localeData';

dayjs.extend(localeData);

export const getMonthShort = (locale: string) => {
  dayjs.locale(locale);
  return range(0, 12).map(v =>
    dayjs()
      .localeData()
      .monthsShort(dayjs().month(v))
  );
};

export const getWeekDays = (locale: string) => {
  dayjs.locale(locale);
  return range(7).map(v =>
    dayjs()
      .localeData()
      .weekdaysShort(dayjs().day(v))
  );
};

export const getToday = (locale: string) => {
  return dayjs()
    .locale(locale)
    .format('LL');
};
