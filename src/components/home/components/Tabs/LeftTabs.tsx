import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';

import ChartIds from 'enums/ChartIds';
import chartFilter from 'enums/ChartFilter';
import { getActiveClassName } from 'services/home';

interface LeftTabsProps {
  activeTab: string;
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
const LeftTabs: React.FC<InjectedProps> = (props: InjectedProps): React.ReactElement => {
  const { setFilter, activeTab, disableChartFilter } = props;

  return (
    <div className="tab-section mt-1x">
      <Tabs id="controlled-tab-example" activeKey={ChartIds.TOTAL_SALES} onSelect={(e: any) => setFilter(e)}>
        <Tab
          disabled={disableChartFilter}
          title={chartFilter.TOTAL_SALES}
          eventKey={ChartIds.TOTAL_SALES}
          tabClassName={getActiveClassName(activeTab, ChartIds.TOTAL_SALES)}
        />
        <Tab
          disabled={disableChartFilter}
          title={chartFilter.CARD_VOLUME}
          eventKey={ChartIds.CARD_VOLUME}
          tabClassName={getActiveClassName(activeTab, ChartIds.CARD_VOLUME)}
        />
      </Tabs>
    </div>
  );
};

export default LeftTabs;
