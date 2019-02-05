import { storiesOf } from '@storybook/react';
import * as React from 'react';
import * as moment from 'moment';
import { action } from '@storybook/addon-actions';
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
        onChange={action('onChange')}
      />
    );
  })
  .add('includeTime', () => {
    return <DatePicker onChange={action('onChange')} includeTime />;
  })
  .add('showMonthCnt', () => {
    return (
      <DatePicker
        calendarProps={{
          showMonthCnt: 2,
        }}
        onChange={action('onChange')}
      />
    );
  });
