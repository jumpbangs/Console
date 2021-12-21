import { ChartFilterActions } from './setLineChartFilters';
import { FetchTotalSalesActions } from './fetchTotalSales';
import { FetchCardVolumeActions } from './fetchCardVolume';
import { FetchGuestCountActions } from './fetchGuestCount';
import { FetchChartDataActions } from './fetchLineChartData';
import { FetchTopLocationsActions } from './fetchTopLocations';
import { FetchTotalTicketsActions } from './fetchTotalTickets';
import { FetchTotalTransactionActions } from './fetchTotalTransaction';
type HomeActions =
  | ChartFilterActions
  | FetchChartDataActions
  | FetchTotalSalesActions
  | FetchCardVolumeActions
  | FetchGuestCountActions
  | FetchTotalTicketsActions
  | FetchTopLocationsActions
  | FetchTotalTransactionActions;

export default HomeActions;
