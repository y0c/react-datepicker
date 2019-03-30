import * as React from 'react';
import * as dayjs from 'dayjs';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import RangeDatePicker from '../src/components/RangeDatePicker';
import LayoutDecorator from './decorator/LayoutDecorator';

storiesOf('RangeDatePicker', module)
  .addDecorator(LayoutDecorator)
  .add('default', () => <RangeDatePicker />)
  .add('initial Start & End Date', () => {
    return (
      <RangeDatePicker initialStartDate={dayjs().subtract(7, 'day')} initialEndDate={dayjs()} />
    );
  })
  .add('startText & endText', () => (
    <RangeDatePicker startText={text('startText', 'Start')} endText={text('endText', 'End')} />
  ))
  .add('portal version', () => (
    <RangeDatePicker
      portal
      startText={text('startText', 'Start')}
      endText={text('endText', 'End')}
    />
  ))
  .add('onTop', () => {
    return (
      <div style={{ paddingTop: '300px' }}>
        <RangeDatePicker
          direction={0}
          startPlaceholder={text('startPlaceholder', 'Start Date')}
          endPlaceholder={text('endPlaceholder', 'End Date')}
        />
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
    <RangeDatePicker
      startPlaceholder={text('startPlaceholder', 'Start Date')}
      endPlaceholder={text('endPlaceholder', 'End Date')}
    />
  ));
