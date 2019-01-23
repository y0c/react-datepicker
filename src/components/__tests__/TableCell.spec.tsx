import * as React from 'react';
import * as sinon from 'sinon';
import { shallow } from 'enzyme';
import TableCell from '../TableCell';

describe('<TableCell/>', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('renders with no props', () => {
    const component = shallow(<TableCell />);
    expect(component).toBeTruthy();
  });

  it('props text correctly', () => {
    const component = shallow(<TableCell text="test" />);
    expect(component.find('div').text()).toEqual('test');
  });

  it('props onClick correctly', () => {
    const onClick = sinon.spy();
    const component = shallow(<TableCell onClick={onClick} />);
    component.simulate('click');
    expect(onClick).toHaveProperty('callCount', 1);
  });

  it('props subText correctly', () => {
    const component = shallow(<TableCell subText="test" />);

    expect(component.find('span')).toHaveLength(1);
    expect(component.find('span').text()).toEqual('test');
  });

  it('props className correctly', () => {
    const component = shallow(<TableCell className="test" />);

    expect(component.hasClass('test')).toBeTruthy();
  });
});
