import { mount, shallow, ShallowWrapper, ReactWrapper } from 'enzyme';
import * as moment from 'moment';
import * as React from 'react';
import * as sinon from 'sinon';
import Calendar from '../src/components/Calendar';
import DatePicker, { Props, State } from '../src/components/DatePicker';

describe('<DatePicker/>', () => {
  const mockMoment = moment.unix(1543622400);
  let shallowComponent: ShallowWrapper<React.Component<Props, State>>;
  let mountComponent: ReactWrapper<Props, State>;

  const defaultProps = {
    base: mockMoment,
  };

  const daySelect = (at: number) => {
    mountComponent
      .find('td')
      .at(at)
      .simulate('click');
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
      shallowComponent.find('.datepicker__input').simulate('click');
      expect(shallowComponent.find('.datepicker__backdrop')).toHaveLength(1);
      expect(shallowComponent.find(Calendar).props().show).toBeTruthy();
      expect(shallowComponent.state('calendarShow')).toBeTruthy();
    });

    it('should hideCalendar correctly', () => {
      shallowComponent.find('.datepicker__input').simulate('click');
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
      mountComponent.find('.datepicker__input').simulate('click');
      expect(mountComponent.state().position.left).not.toEqual('');
      expect(mountComponent.state().position.top).not.toEqual('');
    });

    it('should props inputFormat correctly', () => {
      daySelect(6);
      expect(mountComponent.state().inputValue).toEqual('2018/12/01');
    });

    it('should props onChange correctly', () => {
      daySelect(6);
      expect(onChange).toHaveProperty('callCount', 1);
      expect(mountComponent.state('calendarShow')).toBeFalsy();
      expect(mountComponent.state('selected')).toHaveLength(1);
    });

    it('should props showMonthCnt correctly', () => {
      // 20180501
      const mockDate = moment.unix(1525132800);
      mountComponent = mount(<DatePicker {...defaultProps} base={mockDate} showMonthCnt={3} />);

      expect(mountComponent).toMatchSnapshot();
      expect(mountComponent.find('.calendar__container')).toHaveLength(3);
    });
  });

  describe('custom input test', () => {
    beforeEach(() => {
      const customInputComponent = (props: any) => <textarea value={props.value} readOnly />;

      mountComponent = mount(
        <DatePicker
          {...defaultProps}
          inputFormat="YYYY.MM.DD"
          inputComponent={customInputComponent}
        />
      );
    });

    it('should customInput render correctly', () => {
      expect(mountComponent.find('.datepicker__input textarea')).toBeTruthy();
    });

    it('should customInput value correctly', () => {
      daySelect(6);
      expect(mountComponent.find('.datepicker__input textarea').props().value).toBeDefined();
      expect(mountComponent.find('.datepicker__input textarea').props().value).toEqual(
        '2018.12.01'
      );
    });
  });
});
