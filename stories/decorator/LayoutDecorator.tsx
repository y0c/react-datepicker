import * as React from 'react';

const LayoutDecorator = (storyFn: any) => (
  <div
    style={{
      height: '300px',
    }}
  >
    {storyFn()}
  </div>
);

export default LayoutDecorator;
