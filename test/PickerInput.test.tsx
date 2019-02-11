import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import PickerInput from '../src/components/PickerInput';
import * as sinon from 'sinon';

describe('<PickerInput/>', () => {
  let onChange: sinon.SinonSpy;
  let onClear: sinon.SinonSpy;
  let mountComponent: ReactWrapper;

  beforeEach(() => {
    onChange = sinon.spy();
    onClear = sinon.spy();
    mountComponent = mount(<PickerInput autoFocus clear onChange={onChange} onClear={onClear} />);
  });

  it('should props autoFocus correctly', () => {
    expect(mountComponent.find('input').getDOMNode()).toEqual(document.activeElement);
  });

  it('should onClear correctly', () => {
    mountComponent.find('.icon-clear').first().simulate('click');
    expect(onClear).toHaveProperty('callCount', 1);
  });

  it('should onChange correctly', () => {
    mountComponent.find('input').simulate('change');
    expect(onChange).toHaveProperty('callCount', 1);
  });
});
