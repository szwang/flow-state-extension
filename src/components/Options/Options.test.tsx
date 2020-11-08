import React from 'react';
import { mount } from 'enzyme';

import Options from './Options';

describe('<Options />', () => {
  it('allows us to set props', () => {
    const wrapper = mount(<Options />);
    console.log(wrapper.debug());
  });
});
