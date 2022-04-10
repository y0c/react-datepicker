export declare namespace IDatePicker {
    type Locale = any;
    enum PickerDirection {
        TOP = 0,
        BOTTOM = 1
    }
    enum ViewMode {
        YEAR = 0,
        MONTH = 1,
        DAY = 2
    }
    enum TimeType {
        AM = "AM",
        PM = "PM"
    }
    interface Position {
        left?: string;
        top?: string;
        bottom?: string;
        right?: string;
    }
    interface SVGIconProps {
        size?: string;
        className?: string;
        color?: string;
        onClick?: () => void;
        style?: {};
    }
}
