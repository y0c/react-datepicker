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

  it('should hour up & down correctly', () => {
    btnClick('up', 0);
    expect(mountComponent.state('hour')).toEqual(1);

    btnClick('down', 0);
    expect(mountComponent.state('hour')).toEqual(0);
  });

  it('should minute up & down correctly', () => {
    btnClick('up', 1);
    expect(mountComponent.state('minute')).toEqual(1);

    btnClick('down', 1);
    expect(mountComponent.state('minute')).toEqual(0);
  });

  it('should timetype change correctly', () => {
    radioChange(0);
    expect(mountComponent.state('type')).toEqual('AM');

    radioChange(1);
    expect(mountComponent.state('type')).toEqual('PM');

    radioChange(2);
    expect(mountComponent.state('type')).toEqual('ALL');
  });

  it('should hour max operating correctly accroding to type', () => {
    mountComponent.setState({
      type: 'PM',
    });
    range(13).forEach(() => btnClick('up', 0));
    expect(mountComponent.state('hour')).toEqual(12);

    mountComponent.setState({
      type: 'ALL',
      hour: 0,
    });
    range(14).forEach(() => btnClick('up', 0));
    expect(mountComponent.state('hour')).toEqual(14);
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
