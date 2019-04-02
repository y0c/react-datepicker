export namespace IDatePicker {
  export type Locale = string | { name: string; [key: string]: any };
  export enum PickerDirection {
    TOP,
    BOTTOM,
  }

  export enum ViewMode {
    YEAR,
    MONTH,
    DAY,
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
