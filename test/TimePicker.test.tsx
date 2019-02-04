import { mount, shallow, ShallowWrapper, ReactWrapper } from 'enzyme';
import * as moment from 'moment';
import * as React from 'react';
import * as sinon from 'sinon';
import TimeContainer from '../src/components/TimeContainer';
import TimePicker from '../src/components/TimePicker';

describe('<TimePicker/>', () => {
  describe('shallow render test', () => {
    let shallowComponent: ShallowWrapper<React.Component>;

    beforeEach(() => {
      shallowComponent = shallow(<TimePicker />);
    });

    it('render with no props', () => {
      expect(shallowComponent).toBeTruthy();
      expect(shallowComponent).toMatchSnapshot();
    });

    it('should input interaction correctly', () => {
      shallowComponent.find('.timepicker__input').simulate('click');
      expect(shallowComponent.find('.timepicker__backdrop')).toHaveLength(1);
      expect(shallowComponent.state('timeShow')).toBeTruthy();
    });

    it('should hideCalendar correctly', () => {
      shallowComponent.find('.timepicker__input').simulate('click');
      shallowComponent.find('.timepicker__backdrop').simulate('click');
      expect(shallowComponent.state('timeShow')).toBeFalsy();
    });
  });

  describe('mount test', () => {
    let onChange: sinon.SinonSpy;
    let mountComponent: ReactWrapper;
    beforeEach(() => {
      onChange = sinon.spy();
      mountComponent = mount(<TimePicker onChange={onChange} />);
    });

    it('should props onChange correctly', () => {
      mountComponent
        .find('.time-input__up button')
        .at(0)
        .simulate('click');
      expect(onChange).toHaveProperty('callCount', 1);
    });

    it('should state top, left correctly', () => {
      mountComponent.find('.timepicker__input').simulate('click');
      expect(mountComponent.state('top')).not.toEqual('');
      expect(mountComponent.state('left')).not.toEqual('');
    });

    it('should input change event correctly', () => {
      mountComponent.find('.timepicker__input input').simulate('change', {
        currentTarget: {
          value: 'test',
        },
      });
    });
  });
});
