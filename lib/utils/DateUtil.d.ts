import * as dayjs from 'dayjs';
export declare const getDayMatrix: (year: number, month: number) => string[][];
export declare const getMonthMatrix: (locale: any) => any[][];
export declare const getYearMatrix: (year: number) => string[][];
export declare const isDayEqual: (day1?: dayjs.Dayjs | undefined, day2?: dayjs.Dayjs | undefined) => boolean;
export declare const isDayAfter: (day1: dayjs.Dayjs, day2: dayjs.Dayjs) => boolean;
export declare const isDayBefore: (day1: dayjs.Dayjs, day2: dayjs.Dayjs) => boolean;
export declare const isDayRange: (date: dayjs.Dayjs, start?: dayjs.Dayjs | undefined, end?: dayjs.Dayjs | undefined) => boolean;
export declare const formatDate: (date: dayjs.Dayjs | undefined, format: string) => string;
