import { getDayMatrix, isDayEqual } from '../DateUtil';
import moment = require('moment');

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

});