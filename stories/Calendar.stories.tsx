import { storiesOf } from '@storybook/react';
import * as React from 'react';
import * as dayjs from 'dayjs';
import CalendarSelectedController from '../examples/CalendarSelectedController';
import { number } from '@storybook/addon-knobs';
import './css/custom.css';
import 'dayjs/locale/ko';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/ja';

storiesOf('Calendar', module)
  .add('default', () => {
    return <CalendarSelectedController showToday={false} />;
  })
  .add('i18n internalizeation', () => {
    return (
      <div>
        <div className="panel">
          <h2>Korea</h2>
          <CalendarSelectedController locale="ko" />
        </div>
        <div className="panel">
          <h2>Japen</h2>
          <CalendarSelectedController locale="ja" />
        </div>
        <div className="panel">
          <h2>China</h2>
          <CalendarSelectedController locale="zh-cn" />
        </div>
      </div>
    );
  })
  .add('custom locale object', () => {
    return (
      <CalendarSelectedController
        locale={{
          name: 'ko',
          weekdays: '일요일_월요일_화요일_수요일_목요일_금요일_토요일'.split('_'),
          weekdaysShort: '일_월_화_수_목_금_토'.split('_'),
          months: '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
        }}
      />
    );
  })
  .add('todayPanel', () => {
    return <CalendarSelectedController showToday={true} />;
  })
  .add('showMonthCnt', () => {
    const showMontCnt = number('showMonthCnt', 2);
    return <CalendarSelectedController showMonthCnt={showMontCnt} />;
  })
  .add('disableDay', () => {
    const disableDay = (date: dayjs.Dayjs) => {
      return dayjs(date).date() < 7;
    };
    return <CalendarSelectedController disableDay={disableDay} />;
  })
  .add('selected & onChange', () => {
    return <CalendarSelectedController />;
  })
  .add('multiple select', () => {
    return <CalendarSelectedController multiple={true} />;
  })
  .add('custom day class', () => {
    const customDayClass = (date: dayjs.Dayjs) => {
      // for test (year, month remove)
      const classMap = {
        '01': 'custom-class',
        '02': 'day-test1',
      };

      return classMap[dayjs(date).format('DD')];
    };
    return (
      <div>
        <CalendarSelectedController customDayClass={customDayClass} />
        custom-class, day-test class example
      </div>
    );
  })
  .add('custom day text', () => {
    const customDayText = (date: dayjs.Dayjs) => {
      // for test (year, month remove)
      const classMap = {
        '01': '첫째날',
        '02': '둘째날',
      };

      return classMap[dayjs(date).format('DD')];
    };
    return <CalendarSelectedController customDayText={customDayText} />;
  });
