import { storiesOf } from '@storybook/react';
import * as React from 'react';
import * as moment from 'moment';
import DatePicker from '../src/components/DatePicker';

storiesOf('DatePicker', module)
  .add('default', () => {
    return <DatePicker locale="en-ca" />;
  })
  .add('showMonthCnt', () => {
    return <DatePicker showMonthCnt={2} />;
  });
