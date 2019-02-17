import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import RangeDatePicker from '../src/components/RangeDatePicker';
import LayoutDecorator from './decorator/LayoutDecorator';

storiesOf('RangeDatePicker', module)
  .addDecorator(LayoutDecorator)
  .add('default', () => <RangeDatePicker />)
  .add('startText & endText', () => <RangeDatePicker startText="Start" endText="End" />)
  .add('portal version', () => <RangeDatePicker portal startText="Start" endText="End" />)
  .add('onTop', () => {
    return (
      <div style={{ paddingTop: '300px' }}>
        <RangeDatePicker direction={0} startPlaceholder="Start Date" endPlaceholder="End Date" />
      </div>
    );
  })
  .add('show 3 month', () => {
    return <RangeDatePicker showMonthCnt={3} />;
  })
  .add('dateFormat', () => {
    return <RangeDatePicker dateFormat={text('dateformat', 'YYYY/MM/DD')} />;
  })
  .add('wrapping calendar', () => {
    const wrapper = (calendar: JSX.Element) => (
      <div style={{ border: '1px solid #ddd', padding: '10px', background: 'white' }}>
        <p>
          <strong>Please select a reservation date</strong>
        </p>
        {calendar}
      </div>
    );

    return (
      <RangeDatePicker
        startText="Start"
        endText="End"
        startPlaceholder="Start Date"
        endPlaceholder="End Date"
        wrapper={wrapper}
      />
    );
  });

storiesOf('RangeDatePicker - Input Props', module)
  .addDecorator(LayoutDecorator)
  .add('readOnly', () => <RangeDatePicker readOnly />)
  .add('disabled', () => <RangeDatePicker disabled />)
  .add('clear', () => <RangeDatePicker clear />)
  .add('placeholder', () => (
    <RangeDatePicker startPlaceholder="Start Date" endPlaceholder="End Date" />
  ));
