import * as React from 'react';
import * as sinon from 'sinon';
import { shallow } from 'enzyme';
import TableMatrixView from '../TableMatrixView';

describe('<TableMatrixView/>', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('props matrix correctly', () => {
    const arr = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']];
    const component = shallow(
      <TableMatrixView
        matrix={arr}
        cell={(value: string, key: number) => <td key={key}>{value}</td>}
      />
    );
    expect(component).toMatchSnapshot();
    expect(component.find('td')).toHaveLength(9);
  });

  it('props headers correctly', () => {
    const header = ['1', '2', '3'];
    const arr = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']];
    const component = shallow(
      <TableMatrixView
        headers={header}
        matrix={arr}
        cell={(value: string, key: number) => <td key={key}>{value}</td>}
      />
    );

    expect(component.find('thead tr').children()).toHaveLength(3);
  });
});
