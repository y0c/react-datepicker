import * as moment from 'moment';
import { getDayMatrix, isDayEqual, isDayRange } from '../DateUtil';

describe('DateUtil', () => {
  it('func isDayEqual correctly', () => {
    const day1 = moment('20190101').date(1);
    const day2 = moment('20190101').date(2);
    const day3 = moment('20190101').date(1);
    const day4 = moment('20110101').date(1);

    expect(isDayEqual(day1, day2)).toBeFalsy();
    expect(isDayEqual(day1, day3)).toBeTruthy();
    expect(isDayEqual(day1, day4)).toBeFalsy();
  });

  it('func isDayRange correctly', () => {
    const base = moment('20190101').hour(11);
    const start = moment('20190105').hour(9);
    const end = moment('20190111').hour(10);

    expect(
      [5, 6, 7, 8, 9, 10, 11]
        .map(date => isDayRange(base.date(date), start, end))
        .filter(date => date)
    ).toHaveLength(5);
  });
});
