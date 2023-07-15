export interface ITableColumn {
    id: string;
    label: string;
    minWidth?: number | string;
    align?: 'right';
    format?: (value: number) => string;
}
  