import { mount, shallow, ShallowWrapper, ReactWrapper } from 'enzyme';
import { range } from 'lodash';
import * as moment from 'moment';
import * as React from 'react';
import * as sinon from 'sinon';
import { DatePickerDefaults } from '../src/common/Constant';
import Calendar from '../src/components/Calendar';
import DatePicker, { Props, State, TabValue } from '../src/components/DatePicker';

const PICKER_INPUT_CLASS = '.picker-input__text';

describe('<DatePicker/>', () => {
  let shallowComponent: ShallowWrapper<React.Component<Props, State>>;
  let mountComponent: ReactWrapper<Props, State>;

  const defaultProps = {
    initialDate: new Date(2018, 11, 1),
  };

  const daySelect = (at: number) => {
    mountComponent
      .find('td')
      .at(at)
      .simulate('click');
  };

  describe('shallow render test', () => {
    beforeEach(() => {
      shallowComponent = shallow(<DatePicker {...defaultProps} dateFormat="YYYYMMDD" />);
    });

    it('renders with no props', () => {
      expect(shallowComponent).toBeTruthy();
    });
  });

  describe('mount test', () => {
    let onChange: sinon.SinonSpy;
    beforeEach(() => {
      onChange = sinon.spy();
      mountComponent = mount(
        <DatePicker {...defaultProps} onChange={onChange} dateFormat="YYYY/MM/DD" />
      );
      mountComponent.setState({
        show: true,
      });
    });

    it('should input ref correctly', () => {
      mountComponent.find('.datepicker__input').simulate('click');
      expect(mountComponent.state().position.left).not.toEqual('');
      expect(mountComponent.state().position.top).not.toEqual('');
    });

    it('should props dateFormat correctly', () => {
      daySelect(6);
      expect(mountComponent.find('.datepicker__input input').prop('value')).toEqual('2018/12/01');
    });

    it('should props onChange correctly', () => {
      daySelect(6);
      expect(onChange).toHaveProperty('callCount', 1);
      expect(mountComponent.state('calendarShow')).toBeFalsy();
      expect(mountComponent.state('selected')).toHaveLength(1);
    });

    it('should props showMonthCnt correctly', () => {
      // 20180501
      const mockDate = new Date(2018, 5, 1);
      mountComponent = mount(<DatePicker initialDate={mockDate} showMonthCnt={3} />);
      mountComponent.setState({
        show: true,
      });

      expect(mountComponent.find('.calendar__container')).toHaveLength(3);
    });

    it('should input interaction correctly', () => {
      mountComponent.find('.datepicker__input').simulate('click');
      expect(mountComponent.find('.rc-backdrop')).toHaveLength(1);
      expect(mountComponent.find(Calendar)).toBeTruthy();
      expect(mountComponent.state('show')).toBeTruthy();
    });

    it('should hideCalendar correctly', () => {
      mountComponent.find('.datepicker__input').simulate('click');
      mountComponent.find('.rc-backdrop').simulate('click');
      expect(mountComponent.state('show')).toBeFalsy();
    });
  });

  describe('include time', () => {
    beforeEach(() => {
      mountComponent = mount(<DatePicker {...defaultProps} locale="en-ca" includeTime />);
      mountComponent.setState({
        show: true,
      });
    });

    it('should time container render correctly', () => {
      expect(mountComponent.find('.time__container')).toBeTruthy();
    });

    it('should hour == 0 display correctly', () => {
      mountComponent.setState({
        ...mountComponent.state,
        date: moment()
          .clone()
          .hour(0),
        tabValue: TabValue.TIME,
      });

      expect(
        mountComponent
          .find('.time-input__text input')
          .at(0)
          .prop('value')
      ).toEqual(12);
    });

    it('should hour < 12 display correctly', () => {
      mountComponent.setState({
        ...mountComponent.state,
        date: moment()
          .clone()
          .hour(13),
        tabValue: TabValue.TIME,
      });

      expect(
        mountComponent
          .find('.time-input__text input')
          .at(0)
          .prop('value')
      ).toEqual(1);
    });

    it('should tab TIME click correctly', () => {
      mountComponent.setState({
        ...mountComponent.state,
        tabValue: TabValue.DATE,
      });

      mountComponent
        .find('.datepicker__container__tab button')
        .at(1)
        .simulate('click');
      expect(mountComponent.state('tabValue')).toEqual(TabValue.TIME);
    });

    describe('handleTimeChange', () => {
      const handleClick = (type: string, at: number) => {
        mountComponent
          .find(`.time-input__${type} button`)
          .at(at)
          .simulate('click');
      };

      beforeEach(() => {
        mountComponent = mount(<DatePicker includeTime />);
        mountComponent.setState({
          show: true,
          tabValue: TabValue.TIME,
        });
      });

      it('should hour change 12', () => {
        mountComponent
          .find('.radio')
          .at(0)
          .simulate('change');
        range(11).forEach(() => handleClick('up', 0));

        expect(mountComponent.state('date').hour()).toEqual(0);
      });

      it('should hour PM(not 12)', () => {
        mountComponent
          .find('.radio')
          .at(1)
          .simulate('change');

        expect(mountComponent.state('date').hour()).toEqual(13);
      });

      it('should fire onChange Event', () => {
        const onChange = sinon.spy();
        mountComponent = mount(<DatePicker {...defaultProps} onChange={onChange} includeTime />);
        mountComponent.setState({
          show: true,
          tabValue: TabValue.TIME,
        });
        handleClick('up', 0);
        expect(onChange).toHaveProperty('callCount', 1);
      });
    });
  });

  describe('handleInputBlur', () => {
    beforeEach(() => {
      mountComponent = mount(<DatePicker {...defaultProps} />);
    });

    it('should picker input invalid value return original date', () => {
      const { dateFormat } = DatePickerDefaults;
      const originalDate = moment(new Date(2018, 4, 1));
      const testValue = 'teste333';
      mountComponent.setState({
        ...mountComponent.state,
        date: originalDate,
        dateValue: testValue,
      });

      mountComponent.find(PICKER_INPUT_CLASS).simulate('blur');

      const dateState = mountComponent.state('date');
      expect(dateState).not.toBeUndefined();

      if (dateState) {
        expect(dateState.format(dateFormat)).toEqual(originalDate.format(dateFormat));
      }
    });

    it('should picker input valid value setState date', () => {
      const { dateFormat } = DatePickerDefaults;
      const originalDate = moment(new Date(2018, 4, 1));
      const correctValue = '2018-05-02';
      mountComponent.setState({
        ...mountComponent.state,
        date: originalDate,
        dateValue: correctValue,
      });

      mountComponent.find(PICKER_INPUT_CLASS).simulate('blur');

      const dateState = mountComponent.state('date');
      expect(dateState).not.toBeUndefined();

      if (dateState) {
        expect(dateState.format(dateFormat)).toEqual(correctValue);
      }
    });
  });

  describe('handleInputClear', () => {
    beforeEach(() => {
      mountComponent = mount(<DatePicker {...defaultProps} clear />);
    });

    it('should clear button render correctly', () => {
      expect(mountComponent.find('.icon-clear')).toHaveLength(1);
    });

    it('should clear click state change correctly', () => {
      mountComponent.find('.icon-clear').simulate('click');
      expect(mountComponent.state('dateValue')).toEqual('');
    });

    it('should clear click onChange fired!', () => {
      const onChange = sinon.spy();
      mountComponent = mount(<DatePicker {...defaultProps} onChange={onChange} clear />);
      mountComponent.find('.icon-clear').simulate('click');
      expect(onChange).toHaveProperty('callCount', 1);
    });
  });

  describe('handleInputChange', () => {
    it('should input change correctly', () => {
      const onChange = sinon.spy();
      mountComponent = mount(<DatePicker {...defaultProps} onChange={onChange} />);
      mountComponent.find(PICKER_INPUT_CLASS).simulate('change');
      expect(onChange).toHaveProperty('callCount', 1);
      mountComponent = mount(<DatePicker {...defaultProps} />);
      mountComponent.find(PICKER_INPUT_CLASS).simulate('change');
    });
  });

  describe('input props', () => {
    it('should input disabled do not run handleCalendar', () => {
      mountComponent = mount(<DatePicker {...defaultProps} disabled />);
      mountComponent.find(PICKER_INPUT_CLASS).simulate('click');
      expect(mountComponent.state('show')).toBeFalsy();
    });

    it('should showDefaultIcon correctly', () => {
      mountComponent = mount(<DatePicker {...defaultProps} showDefaultIcon />);
      expect(mountComponent.find('.icon-calendar')).toHaveLength(1);
    });
  });

  describe('custom input test', () => {
    beforeEach(() => {
      const customInputComponent = (props: any) => <textarea value={props.value} readOnly />;

      mountComponent = mount(
        <DatePicker
          {...defaultProps}
          dateFormat="YYYY.MM.DD"
          inputComponent={customInputComponent}
        />
      );
      mountComponent.setState({
        show: true,
      });
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
