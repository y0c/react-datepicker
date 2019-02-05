import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PickerInput from '../src/components/PickerInput';

storiesOf('PickerInput', module).add('default', () => (
  <PickerInput onChange={action('onChange')} />
));
