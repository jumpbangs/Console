interface ChartData {
  value: number;
  end_time: number;
  start_time: number;
}

export interface ChartResponse {
  unit: string;
  total: number;
  average: number;
  data: ChartData[];
  currency: number | null;
}

export default ChartResponse;
