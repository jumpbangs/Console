/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { connect } from 'react-redux';

import AppState from 'domain/states/AppState';
import LineChart from './components/lineChart';
import { emptyLineChart } from 'assets/images';
import ChartState from 'domain/states/ui/Chart';
import TabState from 'domain/misc/home/TabState';
import LeftTabs from './components/Tabs/LeftTabs';
import RightTabs from './components/Tabs/RightTabs';
import ChartData from 'domain/states/data/home/Chart';
import { DateRange } from 'domain/misc/common/DateRange';
import { ChartParams } from 'domain/request/ChartParams';
import { startOfToday, endOfToday } from 'utils/dateTime';
import { CONVERT_TO_DOLLAR } from 'constants/appConstants';
import { ChartFilterToName } from 'maps/ChartFilterToName';
import ChartFilter from 'domain/states/data/home/ChartFilter';
import { fetchChartData } from 'actions/home/fetchLineChartData';
import { ChartData as LineChartData } from 'domain/response/Chart';
import { getFormattedChartData, getToolTipData } from 'services/home';
import { setChartFilter, setChartTimeFilter } from 'actions/home/setLineChartFilters';

interface LineChartWrapperProps {
  locationId: string;
  tabState: TabState;
}

interface MappedProps {
  dateRange: DateRange;
  chartState: ChartState;
  lineChartData: ChartData;
  chartFilters: ChartFilter;
}

interface DispatchedProps {
  setChartFilter: (arg: string) => void;
  setChartTimeFilter: (arg: string) => void;
  fetchChartData: (arg: ChartParams, location: string) => void;
}

type InjectedProps = MappedProps & DispatchedProps & LineChartWrapperProps;

/**
 * LineChartWrapper Component.
 *
 * @param {InjectedProps} props
 *
 * @returns {React.FC}
 */
const LineChartWrapper: React.FC<InjectedProps> = (props: InjectedProps): React.ReactElement => {
  const { dateRange, chartState, chartFilters, lineChartData, tabState, locationId } = props;

  const { startDate, endDate } = dateRange;
  const { leftFilter, rightFilter } = chartFilters;
  const { isFetchingTotalSales, isFetchingChartData, isFetchingCardVolume, isChartDataVisible } = chartState;

  const payload = {
    unit: rightFilter,
    end_time: endDate || endOfToday(),
    start_time: startDate || startOfToday(),
  };

  /**
   * Format line chart data if there is only one value.
   * If only one value is in the data, then it won't show
   * any line chart because it needs 2 points to show the chart.
   * so, it will add data with 0 value at the beginning of the
   * array which will make 2 points and the line chart will be visible.
   *
   * @returns {LineChartData[]}
   */
  const formatLineChartData = (): LineChartData[] => {
    const chartDataValue = lineChartData.lineChart.data;
    const dataLen = chartDataValue.length;

    if (dataLen === 1) {
      const data = chartDataValue[0];
      chartDataValue.unshift({ ...data, value: 0 });
    }

    return chartDataValue;
  };

  /**
   * Format line chart tooltip.
   * If the value of the point is 0 then it will be
   * discarded and is not shown in the tooltip.
   *
   * This is done to hide the tooltip in the 0th position when
   * there is only one data in the line chart.
   *
   * Since formatLineChartData() will add additional points to show
   * the line chart in case of singe value, it will also also add the
   * value 0, but we don't need to show the 0 in tooltip so, this function
   * helps to discard it.
   *
   * @param {LineChartData} lineData
   *
   * @returns {string}
   */
  const formatToolTip = (lineData: LineChartData): string => {
    const shouldShowToolTip = lineData.value !== 0;

    return shouldShowToolTip ? getToolTipData(new Date(lineData.start_time), rightFilter) : '';
  };

  /**
   * Format chart data as needed.
   */
  const mappedChartData = formatLineChartData().map((lineData) => {
    return {
      x: getFormattedChartData(new Date(lineData.start_time), rightFilter),
      y: Number(lineData.value) / CONVERT_TO_DOLLAR,
      tooltip: formatToolTip(lineData),
    };
  });

  /**
   * Format data as needed by line chart to display.
   */
  const formattedLineChartData = [
    {
      id: ChartFilterToName[leftFilter],
      color: '#586ADA',
      data: [...mappedChartData],
    },
  ];

  /**
   * Used to disable the chart filter to stop the chart changes immediately,
   * Once the data is completed the only it reflects to the chart.
   */
  const disableChartFilter = isFetchingChartData || isFetchingTotalSales || isFetchingCardVolume;

  const fetchLineChartData = React.useCallback(async () => {
    await props.fetchChartData({ ...payload, id: leftFilter }, locationId);
  }, [leftFilter, rightFilter, locationId]);

  React.useEffect(() => {
    fetchLineChartData();
  }, [fetchLineChartData]);

  return (
    <>
      <div className="tab-section mt-6x">
        <LeftTabs setFilter={props.setChartFilter} activeTab={leftFilter} disableChartFilter={disableChartFilter} />
        <RightTabs
          tabState={tabState}
          activeTab={rightFilter}
          setFilter={props.setChartTimeFilter}
          disableChartFilter={disableChartFilter}
        />
      </div>
      <div className="chart-section">
        {isChartDataVisible && lineChartData.lineChart.data.length ? (
          <LineChart data={formattedLineChartData} filter={chartFilters.rightFilter} />
        ) : (
          <div className="empty-chart">
            <img className="full-width" src={emptyLineChart} alt="empty-chart" />
          </div>
        )}
      </div>
    </>
  );
};
const mapStateToProps = (state: AppState) => ({
  chartState: state.ui.home,
  dateRange: state.data.dateRange,
  lineChartData: state.data.home.data,
  chartFilters: state.data.home.chartFilters,
});

const mapDispatchToProps = {
  fetchChartData,
  setChartFilter,
  setChartTimeFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(LineChartWrapper);
