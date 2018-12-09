import * as moment from 'moment';
import { chunk, range, repeat } from 'lodash';

export const getDayMatrix = (year?: number, month?: number) => {
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
    ...repeat(' ', 7-remain).split('')
  ], 7);
}