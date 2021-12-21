import { ChartData } from 'domain/response/Chart';

export default interface ChartState {
  overview: {
    totalSales: number;
    cardVolume: number;
    guestCounts: number;
    totalTickets: number;
    totalTransactions: number;
  };
  lineChart: {
    data: ChartData[];
  };
}
