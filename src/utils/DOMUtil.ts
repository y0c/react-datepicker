import { IDatePicker } from '../common/@types';
const convertPx = (value: number) => `${value}px`;
/**
 * Getting Div position as far as distance
 * @param node
 * @param direction
 * @param distance
 */
export const getDivPosition = (
  node: HTMLDivElement | null,
  direction: IDatePicker.PickerDirection = IDatePicker.PickerDirection.BOTTOM,
  distance: number = 5
): IDatePicker.Position => {
  if (!node) return { left: '', top: '', bottom: '' };

  let top = 0;
  let left = 0;
  let bottom = 0;

  switch (direction) {
    case IDatePicker.PickerDirection.BOTTOM:
      top = node.offsetTop + node.offsetHeight + distance;
      left = node.offsetLeft;
      break;
    case IDatePicker.PickerDirection.TOP:
      bottom = node.offsetTop - distance;
      left = node.offsetLeft;
      break;
  }
  return {
    top: convertPx(top),
    left: convertPx(left),
    bottom: convertPx(bottom),
  };
};
