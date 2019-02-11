import * as React from 'react';
import { IDatePicker } from '../../common/@types';
import { Calendar, Clear, Down, LeftArrow, RightArrow, Time, Up} from './Icons';

interface Props extends IDatePicker.SVGIconProps {
  id: string;
}

const SVGIcon: React.FunctionComponent<Props> = props => {
  const iconMap = {
    'calendar': Calendar,
	  'clear': Clear,
    'time': Time,
    'left-arrow': LeftArrow,
	  'right-arrow': RightArrow,
	  'down': Down,
	  'up': Up,
  };

  const Icon = iconMap[props.id];

  return <Icon className={`icon-${props.id}`} {...props} />;
};

SVGIcon.defaultProps = {
  size: '16',
  color: 'currentColor',
};

export default SVGIcon;
