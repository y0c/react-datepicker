import { ReactWrapper } from 'enzyme';

/**
 * mount input simulate change value utility
 * @description
 * shallow render case don't use this func
 * @param node - enzyme wrapper
 * @param testValue - change value
 */
export const mountInputSimulateChange = (node: ReactWrapper, testValue: string) => {
  (node.getDOMNode() as HTMLInputElement).value = testValue;
  node.simulate('change');
};
