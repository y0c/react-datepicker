import * as React from 'react';
import { shallow, mount, ReactWrapper } from 'enzyme';
import Picker, { Props, State } from '../src/components/Picker';

describe('<Picker/>', () => {
  const defaultProps = {
    portal: false,
    className: 'test-picker',
    renderTrigger: () => <div className="test">test</div>,
    renderContents: () => <div className="contents">contents</div>,
  };

  describe('show & hide', () => {
    let mountComponent: ReactWrapper<Props, State>;

    beforeEach(() => {
      mountComponent = mount(<Picker {...defaultProps} />);
    });

    it('should trigger DOM click show backdrop & picker dialog', () => {
      mountComponent.find('.picker__trigger').simulate('click');
      expect(mountComponent.state('show')).toBeTruthy();
    });

    it('shoudl prop disabled click -> dilaog show not working', () => {
      mountComponent = mount(<Picker {...defaultProps} disabled />);
      mountComponent.find('.picker__trigger').simulate('click');
      expect(mountComponent.state('show')).toBeFalsy();
    });

    it('shoudl prop disabled click -> dilaog show not working', () => {
      mountComponent = mount(<Picker {...defaultProps} readOnly />);
      mountComponent.find('.picker__trigger').simulate('click');
      expect(mountComponent.state('show')).toBeFalsy();
    });

    it('should show state & backdrop click -> hide dialog', () => {
      mountComponent.setState({
        show: true,
      });
      mountComponent.find('Backdrop').simulate('click');
    });
  });

  describe('position', () => {
    let mountComponent: ReactWrapper<Props, State>;

    it('should portal false setPosition correctly', () => {
      mountComponent = mount(<Picker {...defaultProps} portal={false} />);
      mountComponent.find('.picker__trigger').simulate('click');

      expect(mountComponent.state().position.left).not.toEqual('');
      expect(mountComponent.state().position.top).not.toEqual('');
    });

    it('should portal true position not set', () => {
      mountComponent = mount(<Picker {...defaultProps} portal={true} />);
      mountComponent.find('.picker__trigger').simulate('click');
      expect(mountComponent.state().position.left).toEqual('');
      expect(mountComponent.state().position.top).toEqual('');
    });
  });
});
