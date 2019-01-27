import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import TimeContainer from '../src/components/TimeContainer';

storiesOf('TimeContainer', module).add(
  'default',
  () => <TimeContainer onChange={action('onChange')} />,
  {
    jest: ['TimeContainer'],
  }
);
