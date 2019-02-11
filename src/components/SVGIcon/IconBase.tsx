import * as React from 'react';
import { IDatePicker } from '../../common/@types';

const IconBase: React.FunctionComponent<IDatePicker.SVGIconProps> = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    fill={props.color}
    {...props}
    viewBox="0 0 24 24"
  >
    {props.children}
  </svg>
);

export default IconBase;
