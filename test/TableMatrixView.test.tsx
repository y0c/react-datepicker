import * as React from 'react';
import * as sinon from 'sinon';
import { shallow, ShallowWrapper } from 'enzyme';
import TableMatrixView from '../src/components/TableMatrixView';

describe('<TableMatrixView/>', () => {
  let component: ShallowWrapper<React.Component>;
  beforeEach(() => {
    const arr = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']];
    const header = ['1', '2', '3'];
    component = shallow(
      <TableMatrixView
        headers={header}
        matrix={arr}
        cell={(value: string, key: number) => <td key={key}>value</td>}
      />
    );
  });

  it('render with no props', () => {
    expect(component).toBeTruthy();
    expect(component).toMatchSnapshot();
  });

  it('props matrix correctly', () => {
    expect(component).toMatchSnapshot();
    expect(component.find('td')).toHaveLength(9);
  });

  it('props headers correctly', () => {
    expect(component.find('thead tr').children()).toHaveLength(3);
  });
});
