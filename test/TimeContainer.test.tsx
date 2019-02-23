import * as React from 'react';
import * as sinon from 'sinon';
import { range } from 'lodash';
import { shallow, mount, ReactWrapper } from 'enzyme';
import TimeContainer from '../src/components/TimeContainer';

describe('<TimeContainer/>', () => {
  let mountComponent: ReactWrapper;
  let onChange: sinon.SinonSpy;

  const btnClick = (type: string, at: number) => {
    mountComponent
      .find(`.time-input__${type} button`)
      .at(at)
      .simulate('click');
  };

  const radioChange = (at: number) => {
    mountComponent
      .find('.radio')
      .at(at)
      .simulate('change');
  };

  beforeEach(() => {
    onChange = sinon.spy();
    mountComponent = mount(<TimeContainer onChange={onChange} />);
  });

  it('should hour up correctly', () => {
    btnClick('up', 0);
    expect(mountComponent.state('hour')).toEqual(2);

    range(11).forEach(() => btnClick('up', 0));
    expect(mountComponent.state('hour')).toEqual(1);

    btnClick('down', 0);
    expect(mountComponent.state('hour')).toEqual(12);

    // if min -1 -> max value
    range(12).forEach(() => btnClick('down', 0));
    expect(mountComponent.state('hour')).toEqual(12);
  });

  it('should minute up & down correctly', () => {
    btnClick('up', 1);
    expect(mountComponent.state('minute')).toEqual(1);

    btnClick('down', 1);
    expect(mountComponent.state('minute')).toEqual(0);

    // if min -1 -> max value
    btnClick('down', 1);
    expect(mountComponent.state('minute')).toEqual(59);
  });

  it('should timetype change correctly', () => {
    radioChange(0);
    expect(mountComponent.state('type')).toEqual('AM');

    radioChange(1);
    expect(mountComponent.state('type')).toEqual('PM');
  });

  it('should onChange called correctly', () => {
    btnClick('up', 0);
    btnClick('up', 1);
    radioChange(0);
    mountComponent
      .find('.time-input__text input')
      .at(0)
      .simulate('change');
    expect(onChange).toHaveProperty('callCount', 4);
  });
});
