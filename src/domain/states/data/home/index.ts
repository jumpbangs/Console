import ChartState from './Chart';
import ChartFilterState from './ChartFilter';
import { TopLocations } from './TopLocations';

interface Home {
  readonly data: ChartState;
  readonly topLocations: TopLocations;
  readonly chartFilters: ChartFilterState;
}

export default Home;
