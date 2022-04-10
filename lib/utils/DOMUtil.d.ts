import { IDatePicker } from '../common/@types';
/**
 * Getting Div position as far as distance
 * @param node
 * @param direction
 * @param distance
 */
export declare const getDivPosition: (node: HTMLDivElement | null, direction: IDatePicker.PickerDirection | undefined, height: number, distance?: number) => IDatePicker.Position;
export declare const getDomHeight: (node: HTMLDivElement | null) => number;
