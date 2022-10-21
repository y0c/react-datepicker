import { chunk, repeat, range } from './ArrayUtil';
import { IDatePicker } from '../common/@types';
import * as dayjs from 'dayjs';
import { getMonthShort } from './LocaleUtil';

const euOffset: number = 1; // ashik

export const getDayMatrix = (year: number, month: number): string[][] => {
  const date = dayjs()
    .year(year)
    .month(month);

  const startOfMonth = date.startOf('month').date();
  const endOfMonth = date.endOf('month').date();

  /** The reason for the modular is that if the startday is -1 we want it to be 6 */
  const startDay = (date.startOf('month').day() - euOffset + 7) % 7;
  const remain = (startDay + endOfMonth) % 7;

  return chunk(
    [
      ...repeat(' ', startDay),
      ...range(startOfMonth, endOfMonth + 1).map(v => `${v}`),
      ...(7 - remain === 7 ? [] : repeat(' ', 7 - remain)),
    ],
    7
  );
};

export const getMonthMatrix = (locale: IDatePicker.Locale) => {
  return chunk(getMonthShort(locale), 3);
};

export const getYearMatrix = (year: number): string[][] => {
  return chunk(range(year - 4, year + 5).map(v => `${v}`), 3);
};

export const isDayEqual = (day1?: dayjs.Dayjs, day2?: dayjs.Dayjs) => {
  if (!day1 || !day2) return false;
  return dayjs(day1).isSame(day2, 'date');
};

export const isDayAfter = (day1: dayjs.Dayjs, day2: dayjs.Dayjs) => {
  return dayjs(day1).isAfter(day2, 'date');
};

export const isDayBefore = (day1: dayjs.Dayjs, day2: dayjs.Dayjs) => {
  return dayjs(day1).isBefore(day2, 'date');
};

export const isDayRange = (date: dayjs.Dayjs, start?: dayjs.Dayjs, end?: dayjs.Dayjs) => {
  if (!start || !end) return false;

  return isDayAfter(date, start) && isDayBefore(date, end);
};

export const formatDate = (date: dayjs.Dayjs | undefined, format: string) => {
  if (date === undefined) return '';
  return dayjs(date).format(format);
};
