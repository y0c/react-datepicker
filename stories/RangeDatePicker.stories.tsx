import * as React from 'react';
import { storiesOf } from '@storybook/react';
import RangeDatePicker from '../src/components/RangeDatePicker';
import LayoutDecorator from './decorator/LayoutDecorator';

storiesOf('RangeDatePicker', module)
  .addDecorator(LayoutDecorator)
  .add('default', () => <RangeDatePicker />)
  .add('startText & endText', () => <RangeDatePicker startText="Start" endText="End" />);

storiesOf('RangeDatePicker - Input Props', module)
  .addDecorator(LayoutDecorator)
  .add('readOnly', () => <RangeDatePicker readOnly />)
  .add('disabled', () => <RangeDatePicker disabled />)
  .add('clear', () => <RangeDatePicker clear />)
  .add('placeholder', () => (
    <RangeDatePicker startPlaceholder="Start Date" endPlaceholder="End Date" />
  ));
