import * as React from 'react';
import { IDatePicker } from '../../common/@types';
import IconBase from './IconBase';

const Calendar: React.FunctionComponent<IDatePicker.SVGIconProps> = props => (
  <IconBase {...props}>
	  <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/>
		<path fill="none" d="M0 0h24v24H0z"/>
  </IconBase>
);

const Clear: React.FunctionComponent<IDatePicker.SVGIconProps> = props => (
	<IconBase {...props}>
		<path fill="none" d="M0 0h24v24H0V0z"/>
		<path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/>
	</IconBase>
);

const LeftArrow: React.FunctionComponent<IDatePicker.SVGIconProps> = props => (
	<IconBase {...props}>
		<path d="M0 0h24v24H0z" fill="none"/>
		<path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
	</IconBase>
);

const RightArrow: React.FunctionComponent<IDatePicker.SVGIconProps> = props => (
	<IconBase {...props}>
		<path d="M0 0h24v24H0z" fill="none"/>
		<path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
	</IconBase>
);

const Time: React.FunctionComponent<IDatePicker.SVGIconProps> = props => (
 <IconBase {...props}>
	 <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/><path d="M0 0h24v24H0z" fill="none"/>
	 <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
	</IconBase>
);

const Up: React.FunctionComponent<IDatePicker.SVGIconProps> = props => (
	<IconBase {...props}>
		<path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
		<path d="M0 0h24v24H0z" fill="none"/>
	</IconBase>
);

const Down: React.FunctionComponent<IDatePicker.SVGIconProps> = props => (
	<IconBase {...props}>
		<path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
		<path fill="none" d="M0 0h24v24H0V0z"/>
	</IconBase>
);
export { Calendar, Clear, LeftArrow, RightArrow, Time, Up, Down };
