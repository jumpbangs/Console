interface FormattedLineChartData {
  id: string;
  color: string;
  data: ChartData[];
}

export interface ChartData {
  tooltip?: string;
  x: number | string;
  y: number | string;
}

export default FormattedLineChartData;
