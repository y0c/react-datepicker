import { getMomentHour, getNormalHour, getTimeType, formatTime } from '../src/utils/TimeUtil';
import { IDatePicker } from '../src/common/@types';

describe('utils.TimeUtil', () => {
  describe('getMomentHour', () => {
    it('if hour 12 & time type AM return 0', () => {
      expect(getMomentHour(12, IDatePicker.TimeType.AM)).toEqual(0);
    });

    it('if hour 12 & time type PM return 12', () => {
      expect(getMomentHour(12, IDatePicker.TimeType.PM)).toEqual(12);
    });

    it('if hour not 12 & time type AM return hour', () => {
      expect(getMomentHour(11, IDatePicker.TimeType.AM)).toEqual(11);
    });

    it('if hour not 12 & time type PM return hour + 12', () => {
      expect(getMomentHour(11, IDatePicker.TimeType.PM)).toEqual(23);
    });
  });

  describe('getNormalHour', () => {
    it('if hour 0 return 12', () => {
      expect(getNormalHour(0)).toEqual(12);
    });

    it('if hour > 12 return hour - 12', () => {
      expect(getNormalHour(13)).toEqual(1);
    });
  });

  describe('getTimeType', () => {
    it('if hour > 11 return PM', () => {
      expect(getTimeType(12)).toEqual(IDatePicker.TimeType.PM);
    });
    it('if hour < 11 return AM', () => {
      expect(getTimeType(11)).toEqual(IDatePicker.TimeType.AM);
    });
  });

  describe('formatTime', () => {
    it('should hh:mm A format correctly', () => {
      expect(formatTime(2, 33, IDatePicker.TimeType.AM)).toEqual('02:33 AM');
    });
  });
});
