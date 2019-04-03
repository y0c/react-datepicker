import * as React from 'react';
import * as sinon from 'sinon';
import { shallow, mount, ReactWrapper } from 'enzyme';
import { mountInputSimulateChange } from './utils/TestingUtil';
import TimeContainer from '../src/components/TimeContainer';

describe('<TimeContainer/>', () => {
  let mountComponent: ReactWrapper;
  let onChange: sinon.SinonSpy;
  let onBlur: sinon.SinonSpy;

  const btnClick = (type: string, at: number) => {
    mountComponent
      .find(`.time-input__${type} button`)
      .at(at)
      .simulate('click');
  };

  beforeEach(() => {
    onChange = sinon.spy();
    onBlur = sinon.spy();
    mountComponent = mount(<TimeContainer onChange={onChange} onBlur={onBlur} />);
  });

  it('should hour not be exceeded maximum value', () => {
    mountComponent.setState({
      ...mountComponent.state,
      hour: 23,
    });
    btnClick('up', 0);
    expect(mountComponent.state('hour')).toBe(23);
  });

  it('should hour not be below minimum value', () => {
    mountComponent.setState({
      ...mountComponent.state,
      hour: 0,
    });
    btnClick('down', 0);
    expect(mountComponent.state('hour')).toBe(0);
  });

  it('should minute not be exceeded maximum value', () => {
    mountComponent.setState({
      ...mountComponent.state,
      minute: 59,
    });
    btnClick('up', 1);
    expect(mountComponent.state('minute')).toBe(59);
  });

  it('should minute not be below minimum value', () => {
    mountComponent.setState({
      ...mountComponent.state,
      minute: 0,
    });
    btnClick('down', 0);
    expect(mountComponent.state('minute')).toBe(0);
  });

  it('should input change call onChnage func', () => {
    mountComponent
      .find('.time-input__text input')
      .at(0)
      .simulate('change');

    expect(onChange).toHaveProperty('callCount', 1);
  });

  it('should input blur call onBlur func', () => {
    mountComponent
      .find('.time-input__text input')
      .at(0)
      .simulate('blur');

    expect(onBlur).toHaveProperty('callCount', 1);
  });

  describe('handleChange', () => {
    it('should input non number set value 0', () => {
      mountInputSimulateChange(mountComponent.find('.time-input__text input').at(0), 'test');
      expect(mountComponent.state('hour')).toBe(0);
    });

    it('should input value exceeded maximum value set value max value', () => {
      mountInputSimulateChange(mountComponent.find('.time-input__text input').at(0), '40');
      expect(mountComponent.state('hour')).toBe(23);
    });

    it('should input value below minimum value set value min value', () => {
      mountInputSimulateChange(mountComponent.find('.time-input__text input').at(0), '-1');
      expect(mountComponent.state('hour')).toBe(0);
    });
  });
});
