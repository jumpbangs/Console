/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { connect } from 'react-redux';

import Table from 'components/common/table';
import AppState from 'domain/states/AppState';
import { DateRange } from 'domain/misc/common/DateRange';
import { getLocationIds } from 'selector/getLocationIds';
import { startOfToday, endOfToday } from 'utils/dateTime';
import TopLocationParam from 'domain/request/TopLocations';
import FormattedLocations from 'domain/misc/home/TopLocation';
import TopLocationsResponse from 'domain/response/TopLocations';
import { fetchTopLocations } from 'actions/home/fetchTopLocations';

interface TopLocationsProps {
  unit: string;
  dateRange: DateRange;
}

interface MappedProps {
  locations: FormattedLocations[];
  topLocations: TopLocationsResponse[];
}

interface DispatchedProps {
  fetchTopLocations: (args: TopLocationParam, arg: FormattedLocations[]) => void;
}

type InjectedProps = MappedProps & DispatchedProps & TopLocationsProps;

/**
 * Top location Component.
 *
 * @returns {React.FC}
 */
const TopLocations: React.FC<InjectedProps> = (props: InjectedProps): React.ReactElement => {
  const { locations, dateRange, unit, topLocations } = props;
  const { endDate, startDate } = dateRange;

  const columns = [
    {
      Header: '',
      id: 'rank',
      width: 30,
      Cell: (props: any) => {
        return <span className="rank-pill">{props.row.index + 1}</span>;
      },
    },
    {
      Header: 'Location',
      accessor: 'location',
      isVisible: true,
      width: 180,
      Cell: (props: any) => {
        const {
          row: { original },
        } = props;

        return <span className="text-ellipsis">{original.location}</span>;
      },
    },
    {
      Header: 'total sales',
      accessor: 'totalSales',
      isVisible: true,
      Cell: (props: any) => {
        const {
          row: { original },
        } = props;

        return <span className="text-bold">${original.totalSales}</span>;
      },
    },
  ];
  const payload: TopLocationParam = {
    unit,
    end_time: endDate || endOfToday(),
    start_time: startDate || startOfToday(),
  };

  const fetchLocationData = React.useCallback(async () => {
    await props.fetchTopLocations(payload, locations);
  }, [props.fetchTopLocations, locations.length, startDate, endDate]);

  React.useEffect(() => {
    if (locations.length) {
      fetchLocationData();
    }
  }, [fetchLocationData]);

  const isTableVisible = topLocations.length > 2;

  return (
    <>
      {isTableVisible && (
        <div className="top-location mt-6x">
          <div className="top-location__title">TOP LOCATIONS</div>
          <Table data={topLocations} columns={columns} />
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  locations: getLocationIds(state),
  topLocations: state.data.home.topLocations,
});

const mapDispatchToProps = {
  fetchTopLocations,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopLocations);
