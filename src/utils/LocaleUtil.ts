import * as dayjs from 'dayjs';
import { IDatePicker } from '../common/@types';
import { range } from '../utils/ArrayUtil';
import * as localeData from 'dayjs/plugin/localeData';
import * as localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localeData);
dayjs.extend(localizedFormat);

export const getMonthShort = (locale: IDatePicker.Locale) => {
  dayjs.locale(locale);
  return range(0, 12).map(v =>
    dayjs()
      .localeData()
      .monthsShort(dayjs().month(v))
  );
};

export const getWeekDays = (locale: IDatePicker.Locale) => {
  dayjs.locale(locale);
  return range(7).map(v =>
    dayjs()
      .localeData()
      .weekdaysShort(dayjs().day(v))
  );
};

export const getToday = (locale: IDatePicker.Locale) => {
  return dayjs()
    .locale(locale)
    .format('LL');
};
