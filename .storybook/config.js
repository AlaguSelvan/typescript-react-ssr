import React from 'react';
import requireContext from 'require-context.macro';
import { configure, addDecorator } from '@storybook/react';

configure(
  requireContext('../app/components', true, /\.stories\.tsx?$/),
  module
);

addDecorator((tree) => (
  <>
    <div style={{ margin: '12px', fontSize: '1rem' }}>{tree()}</div>
  </>
));
