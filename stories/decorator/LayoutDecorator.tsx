import * as React from 'react';

const LayoutDecorator = (storyFn: any) => (
  <div
    style={{
      height: '400px',
    }}
  >
    {storyFn()}
  </div>
);

export default LayoutDecorator;
