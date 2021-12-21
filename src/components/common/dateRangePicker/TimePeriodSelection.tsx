/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import { connect } from 'react-redux';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import { EventSVGIcon } from '@react-md/material-icons';

import history from 'utils/history';
import AppState from 'domain/states/AppState';
import { MONTH_DAY_YEAR } from 'constants/date';
import { DateRange } from 'domain/misc/common/DateRange';
import { setDateRange } from 'actions/setDateRange/setDateRange';

interface MappedProps {
  dateRange: DateRange;
  hasAllTimeParam?: boolean;
}

interface DispatchedProps {
  setDateRange: (arg: DateRange) => void;
}

type InjectedProps = MappedProps & DispatchedProps;

/**
 * Date picker component
 *
 * @returns {React.ReactElement}
 */
const TimePeriodSelection: React.FC<InjectedProps> = (props: InjectedProps): React.ReactElement => {
  const {
    hasAllTimeParam = true,
    dateRange: { startDate, endDate },
  } = props;

  const [focus, setFocus] = React.useState(null);
  const defaultEndDay = !hasAllTimeParam ? moment().utc().endOf('day') : null;
  const defaultStartDay = !hasAllTimeParam ? moment().utc().startOf('day') : null;

  const handleOnDateChange = async ({ startDate, endDate }: any) => {
    await props.setDateRange({
      endDate: endDate ? moment(endDate).utc().endOf('day').valueOf() : defaultEndDay?.valueOf() || null,
      startDate: startDate ? moment(startDate).utc().startOf('day').valueOf() : defaultStartDay?.valueOf() || null,
    });
  };

  React.useEffect(() => {
    history.listen((value) => {
      if (value) {
        props.setDateRange({
          endDate: null,
          startDate: null,
        });
      }
    });
  }, [history]);

  const arrowIcon = !hasAllTimeParam || startDate ? ' - ' : ' ';
  const disableEndDate = !hasAllTimeParam || startDate ? '' : 'disable-end-date';

  const checkIsFutureDate = (day: moment.Moment) => {
    const endDate = moment().endOf('day');

    return day > endDate;
  };

  return (
    <div className={`time-period ${disableEndDate} `}>
      <EventSVGIcon className="time-period__icon mt-0x" />
      <DateRangePicker
        noBorder
        showClearDates
        minimumNights={0}
        numberOfMonths={2}
        endDateId="endDate"
        focusedInput={focus}
        startDateId="startDate"
        anchorDirection="right"
        endDatePlaceholderText=""
        customArrowIcon={arrowIcon}
        displayFormat={MONTH_DAY_YEAR}
        isOutsideRange={checkIsFutureDate}
        onDatesChange={handleOnDateChange}
        startDatePlaceholderText="All time"
        onFocusChange={(focus: any) => setFocus(focus)}
        endDate={endDate ? moment(endDate).utc() : defaultEndDay}
        startDate={startDate ? moment(startDate).utc() : defaultStartDay}
      />
    </div>
  );
};

const mapDispatchToProps = {
  setDateRange,
};

const mapStateToProps = (state: AppState) => ({
  dateRange: state.data.dateRange,
});

export default connect(mapStateToProps, mapDispatchToProps)(TimePeriodSelection);
