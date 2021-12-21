import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';

import ChartIds from 'enums/ChartIds';
import { RightFilter } from 'enums/ChartFilter';
import TabState from 'domain/misc/home/TabState';
import { getActiveClassName } from 'services/home';
import { RIGHT_FILTER } from 'constants/chartFilters';

interface LeftTabsProps {
  activeTab: string;
  tabState: TabState;
  disableChartFilter: boolean;
  setFilter: (arg: string) => void;
}

type InjectedProps = LeftTabsProps;

/**
 * Overview Tabs component.
 *
 * @param {InjectedProps} props
 *
 * @returns {React.ReactElement}
 */
const RightTabs: React.FC<InjectedProps> = (props: InjectedProps): React.ReactElement => {
  const { setFilter, activeTab, tabState, disableChartFilter } = props;

  return (
    <div className="tab-section mt-1x">
      <Tabs id="controlled-tab-example" activeKey={ChartIds.TOTAL_SALES} onSelect={(e: any) => setFilter(e)}>
        <Tab
          title={RIGHT_FILTER.HOURLY}
          eventKey={RightFilter.HOURLY}
          disabled={disableChartFilter || !tabState.hourly}
          tabClassName={getActiveClassName(activeTab, RightFilter.HOURLY, !!tabState.hourly)}
        />
        <Tab
          title={RIGHT_FILTER.DAILY}
          eventKey={RightFilter.DAILY}
          disabled={disableChartFilter || !tabState.daily}
          tabClassName={getActiveClassName(activeTab, RightFilter.DAILY, !!tabState.daily)}
        />
        <Tab
          title={RIGHT_FILTER.WEEKLY}
          eventKey={RightFilter.WEEKLY}
          disabled={disableChartFilter || !tabState.weekly}
          tabClassName={getActiveClassName(activeTab, RightFilter.WEEKLY, !!tabState.weekly)}
        />
        <Tab
          title={RIGHT_FILTER.MONTHLY}
          eventKey={RightFilter.MONTHLY}
          disabled={disableChartFilter || !tabState.monthly}
          tabClassName={getActiveClassName(activeTab, RightFilter.MONTHLY, !!tabState.monthly)}
        />
      </Tabs>
    </div>
  );
};

export default RightTabs;
