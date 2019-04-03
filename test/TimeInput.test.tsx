import * as React from 'react';
import * as sinon from 'sinon';
import { shallow, mount, ShallowWrapper, ReactWrapper } from 'enzyme';
import TimeInput from '../src/components/TimeInput';

describe('<TimeInput/>', () => {
  let onChange: sinon.SinonSpy;
  let onUp: sinon.SinonSpy;
  let onDown: sinon.SinonSpy;
  let onBlur: sinon.SinonSpy;

  let shallowComponent: ShallowWrapper<React.Component>;

  beforeEach(() => {
    onUp = sinon.spy();
    onDown = sinon.spy();
    onChange = sinon.spy();
    onBlur = sinon.spy();
    shallowComponent = shallow(
      <TimeInput onUp={onUp} onDown={onDown} onBlur={onBlur} onChange={onChange} value={0} />
    );
  });

  it('should onUp called correctly', () => {
    shallowComponent.find('.time-input__up button').simulate('click');
    expect(onUp).toHaveProperty('callCount', 1);
  });

  it('should onDown called correctly', () => {
    shallowComponent.find('.time-input__down button').simulate('click');
    expect(onDown).toHaveProperty('callCount', 1);
  });

  it('should onChange called correctly', () => {
    shallowComponent.find('.time-input__text input').simulate('change');
    expect(onChange).toHaveProperty('callCount', 1);
  });
});
