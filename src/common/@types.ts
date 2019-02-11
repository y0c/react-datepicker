export namespace IDatePicker {
  export enum PickerDirection {
    TOP,
    BOTTOM,
  }
  export interface Position {
    left?: string;
    top?: string;
    bottom?: string;
    right?: string;
  }

  export interface SVGIconProps {
    size?: string;
    className?: string;
    color?: string;
    onClick?: () => void;
    style?: {};
  }
}
