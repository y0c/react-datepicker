import * as dayjs from 'dayjs';
import { formatDate, isDayEqual, isDayRange } from '../src/utils/DateUtil';

describe('DateUtil', () => {
  describe('isDayEqual', () => {
    let day1: dayjs.Dayjs;
    let day2: dayjs.Dayjs;

    it('should eq date return true', () => {
      // given
      day1 = dayjs(new Date(2019, 1, 1));
      day2 = dayjs(new Date(2019, 1, 1));

      // when
      const isEqual = isDayEqual(day1, day2);

      // then
      expect(isEqual).toBeTruthy();
    });

    it('should not eq date return false', () => {
      // given
      day1 = dayjs(new Date(2019, 1, 1));
      day2 = dayjs(new Date(2019, 1, 2));

      // when
      const isEqual = isDayEqual(day1, day2);

      // then
      expect(isEqual).toBeFalsy();
    });
  });

  describe('isDayRange', () => {
    let between: dayjs.Dayjs;
    let start: dayjs.Dayjs;
    let end: dayjs.Dayjs;

    it('should between eq start return false', () => {
      // given
      between = dayjs(new Date(2019, 1, 1));
      start = dayjs(new Date(2019, 1, 1));
      end = dayjs(new Date(2019, 1, 6));

      // when
      const isRange = isDayRange(between, start, end);

      // then
      expect(isRange).toBeFalsy();
    });

    it('should between eq end return false', () => {
      // given
      between = dayjs(new Date(2019, 1, 6));
      start = dayjs(new Date(2019, 1, 1));
      end = dayjs(new Date(2019, 1, 6));

      // when
      const isRange = isDayRange(between, start, end);

      // then
      expect(isRange).toBeFalsy();
    });

    it('should between gt start return true', () => {
      // given
      between = dayjs(new Date(2019, 1, 2));
      start = dayjs(new Date(2019, 1, 1));
      end = dayjs(new Date(2019, 1, 6));

      // when
      const isRange = isDayRange(between, start, end);

      // then
      expect(isRange).toBeTruthy();
    });
  });

  describe('formatDate', () => {
    it('should return empty value when date is null', () => {
      expect(formatDate(undefined, 'YYYY-MM-DD')).toBe('');
    });

    it('should return formattedValue value when date is not null', () => {
      const date = dayjs('20181201');
      expect(formatDate(date, 'YYYY-MM-DD')).toBe('2018-12-01');
    });
  });
});
