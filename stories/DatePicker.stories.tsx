import { storiesOf } from '@storybook/react';
import * as React from 'react';
import * as dayjs from 'dayjs';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import DatePicker from '../src/components/DatePicker';
import LayoutDecorator from './decorator/LayoutDecorator';

const defaultProps = {
  onChange: action('onChange'),
  locale: 'en',
};
storiesOf('DatePicker', module)
  .addDecorator(LayoutDecorator)
  .add('default', () => {
    return <DatePicker {...defaultProps} />;
  })
  .add('initialDate', () => {
    return <DatePicker initialDate={dayjs()} />;
  })
  .add('portal version', () => <DatePicker {...defaultProps} portal />)
  .add('includeTime', () => {
    return <DatePicker {...defaultProps} includeTime />;
  })
  .add('showTimeOnly', () => {
    return <DatePicker {...defaultProps} showTimeOnly />;
  })
  .add('dateFormat', () => {
    return <DatePicker {...defaultProps} dateFormat={text('dateformat', 'YYYY/MM/DD')} />;
  })
  .add('showMonthCnt', () => {
    return <DatePicker {...defaultProps} showMonthCnt={2} />;
  })
  .add('onTop', () => {
    return (
      <div style={{ paddingTop: '300px' }}>
        <DatePicker {...defaultProps} direction={0} />
      </div>
    );
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
