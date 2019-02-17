export namespace IDatePicker {
  export enum PickerDirection {
    TOP,
    BOTTOM,
  }

  export enum TimeType {
    AM = 'AM',
    PM = 'PM',
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
