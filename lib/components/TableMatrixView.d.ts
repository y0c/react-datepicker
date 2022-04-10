import * as React from 'react';
interface Props {
    matrix: string[][];
    headers?: string[];
    className?: string;
    cell: (value: string, key: number) => JSX.Element;
}
declare const TableMatrixView: React.FunctionComponent<Props>;
export default TableMatrixView;
