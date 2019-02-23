import { lpad } from './StringUtil';
import { IDatePicker } from '../common/@types';

export const getMomentHour = (hour: number, type: string) => {
  let updateHour = hour;
  if (hour === 12) {
    updateHour = type === IDatePicker.TimeType.AM ? 0 : 12;
  } else {
    updateHour = type === IDatePicker.TimeType.AM ? hour : hour + 12;
  }
  return updateHour;
};

export const getNormalHour = (hour: number) => {
  let updateHour = hour;
  if (updateHour === 0) {
    updateHour = 12;
  } else if (hour > 12) {
    updateHour = hour - 12;
  }
  return updateHour;
};

export const getTimeType = (hour: number): IDatePicker.TimeType =>
  hour > 11 ? IDatePicker.TimeType.PM : IDatePicker.TimeType.AM;

export const formatTime = (hour: number, minute: number, type: string) =>
  `${lpad(String(hour), 2)}:${lpad(String(minute), 2)} ${type}`;

export const isValidTime = (time: string) => /^(1[0-2]|0?[1-9]):[0-5][0-9] (AM|PM)$/.test(time);

export const parseTime = (time: string) => {
  const hour = time.split(':')[0];
  const minute = time.split(':')[1].substring(0, 2);
  const type = time.split(' ')[1];
  return {
    type: type === IDatePicker.TimeType.AM ? IDatePicker.TimeType.AM : IDatePicker.TimeType.PM,
    hour: parseInt(hour, 10),
    minute: parseInt(minute, 10),
  };
};
