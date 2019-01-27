import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import TimeInput from '../src/components/TimeInput';
import 'assets/styles/calendar.scss';

storiesOf('TimeInput', module)
  // .addParameters({ jest: ['TimeInput'] })
  .add(
    'default(min, max)',
    () => (
      <TimeInput
        onUp={action('onUp')}
        onDown={action('onDown')}
        onChange={action('onChange')}
        value={0}
      />
    ),
    {
      jest: ['TimeInput'],
    }
  );
