import { mount, shallow, ShallowWrapper, ReactWrapper } from 'enzyme';
import { range } from 'lodash';
import * as moment from 'moment';
import * as React from 'react';
import * as sinon from 'sinon';
import Calendar from '../src/components/Calendar';
import DatePicker, { Props, State, TabValue } from '../src/components/DatePicker';

describe('<DatePicker/>', () => {
  const mockMoment = moment.unix(1543622400);
  let shallowComponent: ShallowWrapper<React.Component<Props, State>>;
  let mountComponent: ReactWrapper<Props, State>;

  const defaultProps = {
    calendarProps: {
      base: mockMoment,
    },
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
      // expect(shallowComponent).toMatchSnapshot();
    });

    it('should input interaction correctly', () => {
      shallowComponent.find('.datepicker__input').simulate('click');
      expect(shallowComponent.find('.datepicker__backdrop')).toHaveLength(1);
      expect(shallowComponent.find(Calendar)).toBeTruthy();
      expect(shallowComponent.state('show')).toBeTruthy();
    });

    it('should hideCalendar correctly', () => {
      shallowComponent.find('.datepicker__input').simulate('click');
      shallowComponent.find('.datepicker__backdrop').simulate('click');
      expect(shallowComponent.state('show')).toBeFalsy();
    });
  });

  describe('mount test', () => {
    let onChange: sinon.SinonSpy;
    beforeEach(() => {
      onChange = sinon.spy();
      mountComponent = mount(
        <DatePicker
          calendarProps={{
            ...defaultProps.calendarProps,
            onChange,
          }}
          inputFormat="YYYY/MM/DD"
        />
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

    it('should props inputFormat correctly', () => {
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
      const mockDate = moment.unix(1525132800);
      mountComponent = mount(
        <DatePicker
          calendarProps={{
            base: mockDate,
            showMonthCnt: 3,
          }}
        />
      );
      mountComponent.setState({
        show: true,
      });

      expect(mountComponent.find('.calendar__container')).toHaveLength(3);
    });
  });

  describe('include time', () => {
    beforeEach(() => {
      mountComponent = mount(
        <DatePicker
          calendarProps={{
            base: mockMoment,
            locale: 'en-ca',
          }}
          includeTime
        />
      );
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
        value: moment()
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
        value: moment()
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

        expect(mountComponent.state('value').hour()).toEqual(0);
      });

      it('should hour PM(not 12)', () => {
        mountComponent
          .find('.radio')
          .at(1)
          .simulate('change');

        expect(mountComponent.state('value').hour()).toEqual(13);
      });

      it('should fire onChange Event', () => {
        const onChange = sinon.spy();
        mountComponent = mount(
          <DatePicker
            calendarProps={{
              onChange,
            }}
            includeTime
          />
        );
        mountComponent.setState({
          show: true,
          tabValue: TabValue.TIME,
        });
        handleClick('up', 0);
        expect(onChange).toHaveProperty('callCount', 1);
      });
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
