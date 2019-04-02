import { getWeekDays } from '../src/utils/LocaleUtil';
import 'dayjs/locale/en';

describe('LocaleUtil', () => {
  it('should locale string getWeekdays return correctly', () => {
    expect(getWeekDays('en')[0]).toEqual('Sun');
  });

  it('should custom locale object getWeekdays return correctly', () => {
    const customObject = {
      name: 'ko',
      weekdays: '일요일_월요일_화요일_수요일_목요일_금요일_토요일'.split('_'),
      weekdaysShort: '일_월_화_수_목_금_토'.split('_'),
      months: '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
    };
    expect(getWeekDays(customObject)[0]).toEqual('일');
  });
});
