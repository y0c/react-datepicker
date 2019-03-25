import * as dayjs from 'dayjs';
import { getDayMatrix, isDayEqual, isDayRange } from '../src/utils/DateUtil';

describe('DateUtil', () => {
  describe('isDayEqual', () => {
    let day1: Date;
    let day2: Date;

    it('should eq date return true', () => {
      // given
      day1 = new Date(2019, 1, 1);
      day2 = new Date(2019, 1, 1);

      // when
      const isEqual = isDayEqual(day1, day2);

      // then
      expect(isEqual).toBeTruthy();
    });

    it('should not eq date return false', () => {
      // given
      day1 = new Date(2019, 1, 1);
      day2 = new Date(2019, 1, 2);

      // when
      const isEqual = isDayEqual(day1, day2);

      // then
      expect(isEqual).toBeFalsy();
    });
  });

  describe('isDayRange', () => {
    let between: Date;
    let start: Date;
    let end: Date;

    it('should between eq start return false', () => {
      // given
      between = new Date(2019, 1, 1);
      start = new Date(2019, 1, 1);
      end = new Date(2019, 1, 6);

      // when
      const isRange = isDayRange(between, start, end);

      // then
      expect(isRange).toBeFalsy();
    });

    it('should between eq end return false', () => {
      // given
      between = new Date(2019, 1, 6);
      start = new Date(2019, 1, 1);
      end = new Date(2019, 1, 6);

      // when
      const isRange = isDayRange(between, start, end);

      // then
      expect(isRange).toBeFalsy();
    });

    it('should between gt start return true', () => {
      // given
      between = new Date(2019, 1, 2);
      start = new Date(2019, 1, 1);
      end = new Date(2019, 1, 6);

      // when
      const isRange = isDayRange(between, start, end);

      // then
      expect(isRange).toBeTruthy();
    });
  });
});
