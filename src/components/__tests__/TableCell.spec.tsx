import * as React from 'react';
import * as sinon from 'sinon';
import { shallow, ShallowWrapper } from 'enzyme';
import TableCell from '../TableCell';

describe('<TableCell/>', () => {
  let component: ShallowWrapper<React.Component>;
  let onClick: sinon.SinonSpy;
  beforeEach(() => {
    onClick = sinon.spy();
    component = shallow(
      <TableCell text="test" subText="test" className="test" onClick={onClick} />
    );
    jest.resetModules();
  });

  it('renders with no props', () => {
    expect(component).toBeTruthy();
    expect(component).toMatchSnapshot();
  });

  it('props text correctly', () => {
    expect(component.find('div').text()).toEqual('test');
  });

  it('props onClick correctly', () => {
    component.simulate('click');
    expect(onClick).toHaveProperty('callCount', 1);
  });

  it('props subText correctly', () => {
    expect(component.find('span')).toHaveLength(1);
    expect(component.find('span').text()).toEqual('test');
  });

  it('props className correctly', () => {
    expect(component.hasClass('test')).toBeTruthy();
  });
});
