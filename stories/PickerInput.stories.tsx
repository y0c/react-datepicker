import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PickerInput from '../src/components/PickerInput';

if (process.env.NODE_ENV === 'development') {
  storiesOf('PickerInput', module)
    .add('default', () => <PickerInput onChange={action('onChange')} />)
    .add('readOnly', () => <PickerInput readOnly onChange={action('onChange')} />)
    .add('disabled', () => <PickerInput disabled onChange={action('onChange')} />)
    .add('autoFocus', () => <PickerInput autoFocus onChange={action('onChange')} />)
    .add('clear', () => <PickerInput clear onChange={action('onChange')} />);
}
