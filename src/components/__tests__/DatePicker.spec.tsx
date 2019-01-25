import { mount, shallow, ShallowWrapper, ReactWrapper } from 'enzyme';
import * as moment from 'moment';
import * as React from 'react';
import * as sinon from 'sinon';
import Calendar from '../Calendar';
import DatePicker, { Props, State } from '../DatePicker';

describe('<DatePicker/>', () => {
  const mockMoment = moment.unix(1543622400);
  let shallowComponent: ShallowWrapper<React.Component<Props, State>>;
  let mountComponent: ReactWrapper<Props, State>;

  const defaultProps = {
    base: mockMoment,
  };

  describe('shallow render test', () => {
    beforeEach(() => {
      shallowComponent = shallow(<DatePicker {...defaultProps} inputFormat="YYYYMMDD" />);
    });

    it('renders with no props', () => {
      expect(shallowComponent).toBeTruthy();
      expect(shallowComponent).toMatchSnapshot();
    });

    it('should input interaction correctly', () => {
      shallowComponent.find('input').simulate('click');
      expect(shallowComponent.find('.datepicker__backdrop')).toHaveLength(1);
      expect(shallowComponent.find(Calendar).props().show).toBeTruthy();
      expect(shallowComponent.state('calendarShow')).toBeTruthy();
    });

    it('should hideCalendar correctly', () => {
      shallowComponent.find('input').simulate('click');
      shallowComponent.find('.datepicker__backdrop').simulate('click');
      expect(shallowComponent.find(Calendar).props().show).toBeFalsy();
    });
  });

  describe('mount test', () => {
    let onChange: sinon.SinonSpy;
    beforeEach(() => {
      onChange = sinon.spy();
      mountComponent = mount(
        <DatePicker {...defaultProps} onChange={onChange} inputFormat="YYYY/MM/DD" />
      );
    });

    it('should input ref correctly', () => {
      mountComponent.find('input').simulate('click');
      expect(mountComponent.state().position.left).not.toEqual('');
      expect(mountComponent.state().position.top).not.toEqual('');
    });

    it('should props inputFormat correctly', () => {
      mountComponent
        .find('td')
        .at(6)
        .simulate('click');
      expect(mountComponent.find('input').props().value).toEqual('2018/12/01');
    });

    it('should props onChange correctly', () => {
      mountComponent
        .find('td')
        .at(6)
        .simulate('click');

      expect(onChange).toHaveProperty('callCount', 1);
      expect(mountComponent.state('calendarShow')).toBeFalsy();
      expect(mountComponent.state('selected')).toHaveLength(1);
    });

    it('should props showMonthCnt correctly', () => {
      mountComponent = mount(<DatePicker {...defaultProps} showMonthCnt={3} />);

      expect(mountComponent).toMatchSnapshot();
      expect(mountComponent.find('.calendar__container')).toHaveLength(3);
    });
  });
});
