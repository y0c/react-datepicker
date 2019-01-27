import * as React from 'react';
import * as sinon from 'sinon';
import TodayPanel from '../src/components/TodayPanel';
import { shallow, ShallowWrapper } from 'enzyme';

describe('<TodayPanel/>', () => {
  let component: ShallowWrapper<React.Component>;
  let onClick: sinon.SinonSpy;

  beforeEach(() => {
    onClick = sinon.spy();
    component = shallow(<TodayPanel onClick={onClick} today="20190101" show />);
  });

  it('renders without props', () => {
    expect(component).toBeTruthy();
    expect(component).toMatchSnapshot();
  });

  it('props show correctly', () => {
    expect(component.hasClass('calendar__panel--show')).toBeTruthy();
  });

  it('props onClick correctly', () => {
    component.find('h2').simulate('click');
    expect(onClick).toHaveProperty('callCount', 1);
  });

  it('props today correctly', () => {
    expect(component.find('h2').text()).toEqual('20190101');
  });
});
