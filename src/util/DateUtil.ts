import { chunk, range, repeat } from 'lodash';
import * as moment from 'moment';

export const getDayMatrix = (year?: number, month?: number): string[][] => {
  const updateYear = year || moment().year();
  const updateMonth = month || moment().month();

  const date = moment({ years: updateYear, months: updateMonth });

  const startOfMonth = parseInt(date.startOf('month').format('DD'), 10);
  const endOfMonth = parseInt(date.endOf('month').format('DD'), 10);

  const startDay = date.startOf('month').day();
  const remain = (startDay + endOfMonth) % 7;

  return chunk(
    [
      ...repeat(' ', startDay).split(''),
      ...range(startOfMonth, endOfMonth + 1).map(v => `${v}`),
      ...(7 - remain === 7 ? [] : repeat(' ', 7 - remain).split('')),
    ],
    7
  );
};

export const isDayEqual = (day1: moment.Moment, day2: moment.Moment) => {
  return day1.format('YYYYMMDD') === day2.format('YYYYMMDD');
};

export const isDayRange = (date: moment.Moment, start: moment.Moment, end: moment.Moment) => {
  const updateDate = date
    .hour(0)
    .minute(0)
    .second(0);
  const updateStart = start
    .hour(0)
    .minute(0)
    .second(0);
  const updateEnd = end
    .hour(0)
    .minute(0)
    .second(0);

  return date.diff(updateStart, 'days') > 0 && date.diff(updateEnd, 'days') < 0;
};
