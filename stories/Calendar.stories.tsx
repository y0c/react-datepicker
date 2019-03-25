import { storiesOf } from '@storybook/react';
import * as React from 'react';
import * as dayjs from 'moment';
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
  .add('todayPanel', () => {
    return <CalendarSelectedController showToday={true} />;
  })
  .add('showMonthCnt', () => {
    const showMontCnt = number('showMonthCnt', 2);
    return <CalendarSelectedController showMonthCnt={showMontCnt} />;
  })
  .add('disableDay', () => {
    const disableDay = (date: Date) => {
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
    const customDayClass = (date: Date) => {
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
    const customDayText = (date: Date) => {
      // for test (year, month remove)
      const classMap = {
        '01': '첫째날',
        '02': '둘째날',
      };

      return classMap[dayjs(date).format('DD')];
    };
    return <CalendarSelectedController customDayText={customDayText} />;
  });
