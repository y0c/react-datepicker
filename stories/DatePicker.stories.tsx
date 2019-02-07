import { storiesOf } from '@storybook/react';
import * as React from 'react';
import * as moment from 'moment';
import { action } from '@storybook/addon-actions';
import DatePicker from '../src/components/DatePicker';
import LayoutDecorator from './decorator/LayoutDecorator';

const defaultProps = {
  onChange: action('onChange'),
  locale: 'ko',
};
storiesOf('DatePicker', module)
  .addDecorator(LayoutDecorator)
  .add('default', () => {
    return <DatePicker {...defaultProps} />;
  })
  .add('includeTime', () => {
    return <DatePicker {...defaultProps} includeTime />;
  })
  .add('showMonthCnt', () => {
    return <DatePicker {...defaultProps} showMonthCnt={2} />;
  });

storiesOf('DatePicker - Input Props', module)
  .addDecorator(LayoutDecorator)
  .add('showDefaultIcon', () => {
    return <DatePicker {...defaultProps} showDefaultIcon clear />;
  })
  .add('readOnly', () => {
    return <DatePicker {...defaultProps} readOnly />;
  })
  .add('disabled', () => {
    return <DatePicker {...defaultProps} disabled />;
  })
  .add('clear', () => {
    return <DatePicker {...defaultProps} clear />;
  });
