import { lpad } from '../src/utils/StringUtil';

describe('StringUtil', () => {
  describe('lpad', () => {
    it('should str.length === length', () => {
      expect(lpad('33', 2)).toEqual('33');
    });

    it('should str.length < length', () => {
      expect(lpad('3', 2)).toEqual('03');
    });

    it('should specific char', () => {
      expect(lpad('3', 2, '*')).toEqual('*3');
    });
  });
});
