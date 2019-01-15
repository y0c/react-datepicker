import * as moment from 'moment';
import { chunk, range, repeat } from 'lodash';

export const getDayMatrix = (year?: number, month?: number):string[][] => {
  if( year == undefined ) {
    year = moment().year();
  }
  if( month == undefined ) {
    month = moment().month();
  }
  const date = moment({ years: year, months: month});

  const startOfMonth = parseInt(date.startOf('month').format('DD'));
  const endOfMonth   = parseInt(date.endOf('month').format('DD'));

  const startDay = date.startOf('month').day();
  const remain   = (startDay + endOfMonth) % 7;

  return chunk([
    ...repeat(' ', startDay).split(''),
    ...range(startOfMonth, endOfMonth + 1).map(v=>v+''),
    ...((7-remain) == 7 ? [] : repeat(' ', 7-remain).split(''))
  ], 7);
}

export const isDayEqual = (day1: moment.Moment, day2: moment.Moment) => {
  return day1.format('YYYYMMDD') === day2.format('YYYYMMDD');
}

export const isDayRange = (date: moment.Moment, start: moment.Moment, end: moment.Moment) => {
  date = date.hour(0).minute(0).second(0);
  start = start.hour(0).minute(0).second(0);
  end = end.hour(0).minute(0).second(0);

  return date.diff(start, 'days') > 0 && date.diff(end, 'days') < 0;
}