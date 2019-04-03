import { range, chunk, repeat } from '../src/utils/ArrayUtil';
describe('ArrayUtil', () => {
  it('should range negative number return empty array', () => {
    expect(range(-1)).toEqual([]);
  });
  it('should range return number array', () => {
    expect(range(3)).toEqual([0, 1, 2]);
    expect(range(3, 5)).toEqual([3, 4]);
  });

  it('should chunk array return matrix array', () => {
    expect(chunk([1, 2, 3, 4, 5, 6, 7, 8, 9], 3)).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    expect(chunk([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3)).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [10],
    ]);
  });

  it('should repeat return character fill array', () => {
    expect(repeat(' ', 5)).toEqual([' ', ' ', ' ', ' ', ' ']);
  });
});
