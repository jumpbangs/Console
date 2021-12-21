/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { connect } from 'react-redux';

import Stat from './components/Stat';
import ChartIds from 'enums/ChartIds';
import { TabSelector } from 'services/home';
import AppState from 'domain/states/AppState';
import LineChartWrapper from './LineChartWrapper';
import TopLocations from './components/TopLocations';
import { ChartParams } from 'domain/request/ChartParams';
import { DateRange } from 'domain/misc/common/DateRange';
import { startOfToday, endOfToday } from 'utils/dateTime';
import ChartStateData from 'domain/states/data/home/Chart';
import { fetchTotalSales } from 'actions/home/fetchTotalSales';
import { fetchGuestCount } from 'actions/home/fetchGuestCount';
import { fetchCardVolume } from 'actions/home/fetchCardVolume';
import { fetchChartData } from 'actions/home/fetchLineChartData';
import { fetchTotalTickets } from 'actions/home/fetchTotalTickets';
import TimePeriodSelection from 'components/common/dateRangePicker';
import { setChartTimeFilter } from 'actions/home/setLineChartFilters';
import { fetchTotalTransactionCount } from 'actions/home/fetchTotalTransaction';

interface MappedProps {
  locationId: string;
  rightFilter: string;
  data: ChartStateData;
  dateRange: DateRange;
}

interface DispatchProps {
  setChartFilter: (arg: string) => void;
  setChartTimeFilter: (arg: string) => void;
  fetchChartData: (arg: ChartParams, location: string) => void;
  fetchTotalSales: (arg: ChartParams, location: string) => void;
  fetchCardVolume: (arg: ChartParams, location: string) => void;
  fetchGuestCount: (arg: ChartParams, location: string) => void;
  fetchTotalTickets: (arg: ChartParams, location: string) => void;
  fetchTotalTransactionCount: (arg: ChartParams, location: string) => void;
}

type InjectedProps = MappedProps & DispatchProps;

/**
 * Home Component.
 *
 * @returns {React.FC}
 */
const Home: React.FC<InjectedProps> = (props: InjectedProps): React.ReactElement => {
  const { data, dateRange, locationId, rightFilter } = props;

  const { startDate, endDate } = dateRange;

  const tabState = TabSelector(startDate || startOfToday(), endDate || endOfToday());

  /**
   * Set default active tab based on the selected time period.
   */
  const setDefaultActiveTab = React.useCallback(async () => {
    await props.setChartTimeFilter(tabState.min);
  }, [tabState.min]);

  React.useEffect(() => {
    setDefaultActiveTab();
  }, [setDefaultActiveTab]);

  const fetchHomeData = React.useCallback(async () => {
    const payload = {
      unit: rightFilter,
      end_time: endDate || endOfToday(),
      start_time: startDate || startOfToday(),
    };

    try {
      await props.fetchGuestCount({ ...payload, id: ChartIds.GUEST_COUNT }, locationId);
      await props.fetchTotalTickets({ ...payload, id: ChartIds.TICKET_COUNT }, locationId);
      await props.fetchTotalTransactionCount({ ...payload, id: ChartIds.TRANSACTION_COUNT }, locationId);
      await props.fetchCardVolume({ ...payload, id: ChartIds.CARD_VOLUME }, locationId);
      await props.fetchTotalSales({ ...payload, id: ChartIds.TOTAL_SALES }, locationId);
    } catch (error) {
      // [TO-DO] Log error
    }
  }, [startDate, endDate, locationId]);

  React.useEffect(() => {
    fetchHomeData();
  }, [fetchHomeData, startDate, endDate]);

  return (
    <div className="overview-section">
      <div className="sticky">
        <div className="title-container d-flex justify-content-between">
          <h1 className="title">Overview</h1>
          <TimePeriodSelection hasAllTimeParam={false} />
        </div>
      </div>
      <Stat statData={data} />
      <LineChartWrapper tabState={tabState} locationId={locationId} />
      <TopLocations dateRange={dateRange} unit={rightFilter} />
    </div>
  );
};

const mapDispatchToProps = {
  fetchChartData,
  fetchTotalSales,
  fetchGuestCount,
  fetchCardVolume,
  fetchTotalTickets,
  setChartTimeFilter,
  fetchTotalTransactionCount,
};

const mapStateToProps = (state: AppState) => ({
  data: state.data.home.data,
  dateRange: state.data.dateRange,
  locationId: state.data.locations.selectedLocationId,
  rightFilter: state.data.home.chartFilters.rightFilter,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
