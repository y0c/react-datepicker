import * as React from 'react';
import * as sinon from 'sinon';
import { shallow, mount, ShallowWrapper, ReactWrapper, HTMLAttributes } from 'enzyme';
import RangePickerInput, { FieldType } from '../src/components/RangePickerInput';

describe('<RagePickerInput />', () => {
  let shallowComponent: ShallowWrapper;

  beforeEach(() => {
    shallowComponent = shallow(<RangePickerInput />);
  });

  it('should render without crash', () => {
    expect(shallowComponent).toBeTruthy();
    expect(shallowComponent).toMatchSnapshot();
  });

  describe('event test', () => {
    let onChange: sinon.SinonSpy;
    let onClick: sinon.SinonSpy;
    let mountComponent: ReactWrapper;
    let startInput: ReactWrapper<HTMLAttributes>;
    let endInput: ReactWrapper<HTMLAttributes>;

    beforeEach(() => {
      onChange = sinon.spy();
      onClick = sinon.spy();
      mountComponent = mount(<RangePickerInput onClick={onClick} onChange={onChange} />);
      startInput = mountComponent.find('.range-picker-input__start .picker-input__text');
      endInput = mountComponent.find('.range-picker-input__end .picker-input__text');
    });

    it('should onClick start & end operate separately', () => {
      startInput.simulate('click');
      expect(onClick.getCalls()[0].args[0]).toEqual(FieldType.START);

      endInput.simulate('click');
      expect(onClick.getCalls()[1].args[0]).toEqual(FieldType.END);
      expect(onClick).toHaveProperty('callCount', 2);
    });

    it('should onChange start & end operate separately', () => {
      startInput.simulate('change');
      expect(onChange.getCalls()[0].args[0]).toEqual(FieldType.START);

      endInput.simulate('change');
      expect(onChange.getCalls()[1].args[0]).toEqual(FieldType.END);
      expect(onChange).toHaveProperty('callCount', 2);
    });
  });
});
