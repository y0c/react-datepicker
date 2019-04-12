import { mount, shallow, ShallowWrapper, ReactWrapper } from 'enzyme';
import * as dayjs from 'dayjs';
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
    initialDate: dayjs(new Date(2018, 11, 1)),
  };

  const pickerShow = (component: ReactWrapper) => {
    component.find('Picker').setState({
      show: true,
    });
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

    it('should includeTime & showTimeOnly cannot be used together', () => {
      expect(() => {
        shallowComponent = shallow(<DatePicker includeTime showTimeOnly />);
      }).toThrowError(Error);
    });

    describe('dateFormat', () => {
      it('should includeTime dateFormat correctly', () => {
        const shallowDatePicker = shallow<DatePicker>(<DatePicker {...defaultProps} includeTime />);
        expect(shallowDatePicker.instance().getDateFormat()).toBe(
          DatePickerDefaults.dateTimeFormat
        );
      });

      it('should calendarOnly dateFormat correctly', () => {
        const shallowDatePicker = shallow<DatePicker>(<DatePicker {...defaultProps} />);
        expect(shallowDatePicker.instance().getDateFormat()).toBe(DatePickerDefaults.dateFormat);
      });

      it('should timeOnly dateFormat correctly', () => {
        const shallowDatePicker = shallow<DatePicker>(
          <DatePicker {...defaultProps} showTimeOnly />
        );
        expect(shallowDatePicker.instance().getDateFormat()).toBe(DatePickerDefaults.timeFormat);
      });
    });
  });

  describe('mount test', () => {
    let onChange: sinon.SinonSpy;
    beforeEach(() => {
      onChange = sinon.spy();
      mountComponent = mount(
        <DatePicker {...defaultProps} onChange={onChange} dateFormat="YYYY/MM/DD" />
      );
      pickerShow(mountComponent);
    });

    it('should showTimeonly render only timeContainer', () => {
      mountComponent = mount(<DatePicker showTimeOnly />);
      pickerShow(mountComponent);
      expect(mountComponent.find('.picker__container__timeonly')).toHaveLength(1);
    });

    it('should input ref correctly', () => {
      mountComponent.find('.picker__trigger').simulate('click');
      expect(mountComponent.find('Calendar')).toHaveLength(1);
    });

    it('should props dateFormat correctly', () => {
      daySelect(7);
      expect(mountComponent.find('.picker__trigger input').prop('value')).toEqual('2018/12/02');
    });

    it('should props onChange correctly', () => {
      daySelect(6);
      expect(onChange).toHaveProperty('callCount', 1);
      expect(mountComponent.state('calendarShow')).toBeFalsy();
      expect(mountComponent.state('selected')).toHaveLength(1);
    });

    it('should props showMonthCnt correctly', () => {
      // 20180501
      const mockDate = dayjs(new Date(2018, 5, 1));
      mountComponent = mount(<DatePicker initialDate={mockDate} showMonthCnt={3} />);
      pickerShow(mountComponent);
      expect(mountComponent.find('.calendar__container')).toHaveLength(3);
    });

    it('should input interaction correctly', () => {
      mountComponent.find('.picker__trigger').simulate('click');
      expect(mountComponent.find('.rc-backdrop')).toHaveLength(1);
      expect(mountComponent.find(Calendar)).toBeTruthy();
      expect(mountComponent.find('Picker').state('show')).toBeTruthy();
    });

    it('should hideCalendar correctly', () => {
      mountComponent.find('.picker__trigger').simulate('click');
      mountComponent.find('.rc-backdrop').simulate('click');
      expect(mountComponent.find('Picker').state('show')).toBeFalsy();
    });
  });

  describe('include time', () => {
    beforeEach(() => {
      mountComponent = mount(<DatePicker {...defaultProps} includeTime />);
    });

    it('should time container render correctly', () => {
      expect(mountComponent.find('.time__container')).toBeTruthy();
    });

    it('should tab TIME click correctly', () => {
      mountComponent.setState({
        ...mountComponent.state,
        tabValue: TabValue.DATE,
      });
      pickerShow(mountComponent);

      mountComponent
        .find('.picker__container__tab button')
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
          tabValue: TabValue.TIME,
        });
        pickerShow(mountComponent);
      });

      it('should set new date when state date is null', () => {
        mountComponent = mount(<DatePicker includeTime />);
        mountComponent.setState({
          tabValue: TabValue.TIME,
        });

        pickerShow(mountComponent);
        handleClick('up', 0);

        const date = mountComponent.state().date;

        expect(date).toBeDefined();
        if (date) {
          expect(date.format(DatePickerDefaults.dateFormat)).toBe(
            dayjs().format(DatePickerDefaults.dateFormat)
          );
        }
      });

      it('should time change set date & input value correctly', () => {
        mountComponent = mount(<DatePicker initialDate={dayjs('201904032320')} includeTime />);
        mountComponent.setState({
          tabValue: TabValue.TIME,
        });

        pickerShow(mountComponent);
        handleClick('up', 0);
        const date = mountComponent.state().date;
        if (date) {
          expect(date.format('YYYYMMDDHHmm')).toBe('201904032320');
        }
      });

      it('should fire onChange Event', () => {
        const onChange = sinon.spy();
        mountComponent = mount(<DatePicker {...defaultProps} onChange={onChange} includeTime />);
        mountComponent.setState({
          tabValue: TabValue.TIME,
        });
        pickerShow(mountComponent);
        handleClick('up', 0);
        expect(onChange).toHaveProperty('callCount', 1);
      });
    });
  });

  describe('handleInputBlur', () => {
    beforeEach(() => {
      mountComponent = mount(<DatePicker {...defaultProps} />);
    });

    it('should date picker input invalid value return original date', () => {
      const { dateFormat } = DatePickerDefaults;
      const originalDate = dayjs(new Date(2018, 4, 1));
      const testValue = 'teste333';
      mountComponent.setState({
        ...mountComponent.state,
        date: originalDate,
        inputValue: testValue,
      });

      mountComponent.find(PICKER_INPUT_CLASS).simulate('blur');

      const dateState = mountComponent.state('date');
      expect(dateState).not.toBeUndefined();

      if (dateState) {
        expect(dayjs(dateState).format(dateFormat)).toEqual(dayjs(originalDate).format(dateFormat));
      }
    });

    it('should date picker input valid value setState date', () => {
      const { dateFormat } = DatePickerDefaults;
      const originalDate = dayjs(new Date(2018, 4, 1));
      const correctValue = '2018-05-02';
      mountComponent.setState({
        ...mountComponent.state,
        date: originalDate,
        inputValue: correctValue,
      });

      mountComponent.find(PICKER_INPUT_CLASS).simulate('blur');

      const dateState = mountComponent.state('date');
      expect(dateState).not.toBeUndefined();

      if (dateState) {
        expect(dayjs(dateState).format(dateFormat)).toEqual(correctValue);
      }
    });

    it('should time picker input invalid value return original time', () => {
      mountComponent = mount(<DatePicker {...defaultProps} includeTime />);
      const originalDate = dayjs('201904031022');

      mountComponent.setState({
        ...mountComponent.state,
        date: originalDate,
        inputValue: `${dayjs(originalDate).format(DatePickerDefaults.dateFormat)} 03:e0A`,
      });

      mountComponent.find(PICKER_INPUT_CLASS).simulate('blur');

      const inputValue = mountComponent.state('inputValue');

      expect(inputValue).toBe(originalDate.format(DatePickerDefaults.dateTimeFormat));
    });
  });

  describe('handleInputClear', () => {
    beforeEach(() => {
      mountComponent = mount(<DatePicker {...defaultProps} clear />);
    });

    it('should clear button render correctly', () => {
      expect(mountComponent.find('.icon-clear').first()).toHaveLength(1);
    });

    it('should clear click state change correctly', () => {
      mountComponent
        .find('.icon-clear')
        .first()
        .simulate('click');
      expect(mountComponent.state('inputValue')).toEqual('');
    });

    it('should clear click onChange fired!', () => {
      const onChange = sinon.spy();
      mountComponent = mount(<DatePicker {...defaultProps} onChange={onChange} clear />);
      mountComponent
        .find('.icon-clear')
        .first()
        .simulate('click');
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
      expect(mountComponent.find('.icon-calendar').first()).toHaveLength(1);
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
      pickerShow(mountComponent);
    });

    it('should customInput render correctly', () => {
      expect(mountComponent.find('.picker__trigger textarea')).toBeTruthy();
    });

    it('should customInput value correctly', () => {
      daySelect(6);
      expect(mountComponent.find('.picker__trigger textarea').props().value).toBeDefined();
      expect(mountComponent.find('.picker__trigger textarea').props().value).toEqual('2018.12.01');
    });
  });
});
