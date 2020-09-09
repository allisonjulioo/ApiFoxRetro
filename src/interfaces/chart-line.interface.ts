export interface ChartLine {
  board: string;
  columns?: ColumnChartData[];
}
export interface ColumnChartData {
  column: string;
  cards: number;
}
