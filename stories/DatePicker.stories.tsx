import { storiesOf } from '@storybook/react';
import * as React from 'react';
import * as moment from 'moment';
import DatePicker from '../src/components/DatePicker';
import LayoutDecorator from './decorator/LayoutDecorator';

storiesOf('DatePicker', module)
  .addDecorator(LayoutDecorator)
  .add('default', () => {
    return (
      <DatePicker
        calendarProps={{
          locale: 'ko',
        }}
      />
    );
  })
  .add('showMonthCnt', () => {
    return (
      <DatePicker
        calendarProps={{
          showMonthCnt: 2,
        }}
      />
    );
  });
