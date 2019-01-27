import { addDecorator, configure } from '@storybook/react';
import { withTests } from '@storybook/addon-jest';
import results from '../.jest.test.result.json';

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.tsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(
  withTests({
    results,
    filesExt: '.test.tsx',
  })
);

configure(loadStories, module);
