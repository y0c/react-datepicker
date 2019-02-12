import * as React from 'react';
import { storiesOf } from '@storybook/react';
import RangeDatePicker from '../src/components/RangeDatePicker';
import LayoutDecorator from './decorator/LayoutDecorator';

storiesOf('RangeDatePicker', module)
  .addDecorator(LayoutDecorator)
  .add('default', () => <RangeDatePicker />)
  .add('startText & endText', () => <RangeDatePicker startText="Start" endText="End" />)
  .add('portal version', () => <RangeDatePicker portal startText="Start" endText="End" />)
  .add('wrapping calendar', () => {

    const wrapper = (calendar: JSX.Element) => (
      <div style={{border : '1px solid #ddd', padding: '10px', background: 'white'}}>
        <p>
          <strong>Please select a reservation date</strong>
        </p>
        {calendar}
      </div>
    );

    return <RangeDatePicker startText="Start" endText="End" startPlaceholder="Start Date" endPlaceholder="End Date" wrapper={wrapper}/>;
  });

storiesOf('RangeDatePicker - Input Props', module)
  .addDecorator(LayoutDecorator)
  .add('readOnly', () => <RangeDatePicker readOnly />)
  .add('disabled', () => <RangeDatePicker disabled />)
  .add('clear', () => <RangeDatePicker clear />)
  .add('placeholder', () => (
    <RangeDatePicker startPlaceholder="Start Date" endPlaceholder="End Date" />
  ));
