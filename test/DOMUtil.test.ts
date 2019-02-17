import { getDivPosition } from '../src/utils/DOMUtil';
import { IDatePicker } from '../src/common/@types';
import { mock, instance, when } from 'ts-mockito';

describe('utils.DOMUtil', () => {
  let mockDiv: HTMLDivElement;
  let instanceDiv: HTMLDivElement;

  describe('getDivPosition', () => {
    it('works with if direction top', () => {
      // given
      mockDiv = mock(HTMLDivElement);
      when(mockDiv.offsetLeft).thenReturn(10);
      when(mockDiv.offsetHeight).thenReturn(10);
      when(mockDiv.offsetTop).thenReturn(10);
      instanceDiv = instance(mockDiv);

      // when
      const position = getDivPosition(instanceDiv, IDatePicker.PickerDirection.TOP, 30);

      // then
      expect(position.top).toEqual('-25px');
      expect(position.left).toEqual('10px');
    });

    it('works with if direction bottom', () => {
      // given
      mockDiv = mock(HTMLDivElement);
      when(mockDiv.offsetLeft).thenReturn(10);
      when(mockDiv.offsetHeight).thenReturn(10);
      when(mockDiv.offsetTop).thenReturn(10);
      instanceDiv = instance(mockDiv);

      // when
      const position = getDivPosition(instanceDiv, IDatePicker.PickerDirection.BOTTOM, 30);

      // then
      expect(position.top).toEqual('25px');
      expect(position.left).toEqual('10px');
    });

    it('does calculate distance if distance parameter not default', () => {
      // given
      mockDiv = mock(HTMLDivElement);
      when(mockDiv.offsetLeft).thenReturn(10);
      when(mockDiv.offsetHeight).thenReturn(10);
      when(mockDiv.offsetTop).thenReturn(10);
      instanceDiv = instance(mockDiv);

      // when
      const position = getDivPosition(instanceDiv, IDatePicker.PickerDirection.BOTTOM, 10, 10);

      // then
      expect(position.top).toEqual('30px');
      expect(position.left).toEqual('10px');
    });

    it('if node null return empty position object', () => {
      // given
      const nullNode = null;

      // when
      const position = getDivPosition(nullNode, IDatePicker.PickerDirection.BOTTOM, 10);

      // then
      expect(position.top).toEqual('');
      expect(position.left).toEqual('');
      expect(position.bottom).toEqual('');
    });
  });
});
