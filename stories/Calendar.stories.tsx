import { storiesOf } from '@storybook/react';
import * as React from 'react';
import * as moment from 'moment';
import Calendar from '../src/components/Calendar';
import CalendarSelectedController from '../examples/CalendarSelectedController';
import { number } from '@storybook/addon-knobs';
import './css/custom.css';

storiesOf('Calendar', module)
  .add('default', () => {
    return <Calendar showToday={false} />;
  })
  .add('i18n internalizeation', () => {
    return (
      <div>
        <div className="panel">
          <h2>Korea</h2>
          <Calendar locale="ko" />
        </div>
        <div className="panel">
          <h2>Japen</h2>
          <Calendar locale="ja" />
        </div>
        <div className="panel">
          <h2>China</h2>
          <Calendar locale="zh-cn" />
        </div>
      </div>
    );
  })
  .add('todayPanel', () => {
    return <Calendar />;
  })
  .add('showMonthCnt', () => {
    const showMontCnt = number('showMonthCnt', 2);
    return <Calendar showMonthCnt={showMontCnt} />;
  })
  .add('selected & onChange', () => {
    return <CalendarSelectedController />;
  })
  .add('multiple select', () => {
    return <CalendarSelectedController multiple={true} />;
  })
  .add('custom day class', () => {
    const customDayClass = (date: moment.Moment) => {
      // for test (year, month remove)
      const classMap = {
        '01': 'custom-class',
        '02': 'day-test1',
      };

      return classMap[date.format('DD')];
    };
    return (
      <div>
        <Calendar customDayClass={customDayClass} />
        custom-class, day-test class example
      </div>
    );
  })
  .add('custom day text', () => {
    const customDayText = (date: moment.Moment) => {
      // for test (year, month remove)
      const classMap = {
        '01': '첫째날',
        '02': '둘째날',
      };

      return classMap[date.format('DD')];
    };
    return <Calendar customDayText={customDayText} />;
  });
