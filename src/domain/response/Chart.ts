export interface ChartData {
  end_time: string;
  start_time: string;
  value: string | number;
}

export interface ChartResponse {
  unit: string;
  total: number;
  average: number;
  data: ChartData[];
  currency: string | null;
}
