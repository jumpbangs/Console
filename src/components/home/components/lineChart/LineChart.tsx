import React from 'react';
import { ResponsiveLine } from '@nivo/line';

import FormattedLineChartData from 'domain/misc/home/Chart';
interface LineChartProps {
  filter: string;
  data: FormattedLineChartData[];
}

type InjectedProps = LineChartProps;

/**
 * Line Chart component.
 *
 * @param {InjectedProps} props
 *
 * @returns {React.ReactElement}
 */
const LineChart: React.FC<InjectedProps> = (props: InjectedProps): React.ReactElement => {
  const { data } = props;

  const xStartValue = data[0].data[0].x;
  const xEndValue = data[0].data[data[0].data.length - 1].x;

  const commonProperties: object = {
    animate: true,
    enableGridX: false,
    enableSlices: 'x',
    crosshairType: 'x',
    isInteractive: true,
    xScale: {
      type: 'point',
      stacked: false,
    },
    colors: { datum: 'color' },
    yScale: { type: 'linear', min: 0, max: 'auto', stacked: false },
    margin: { top: 10, right: 0, bottom: 35, left: 20 },
  };

  const customTheme: object = {
    axis: {
      ticks: {
        line: {
          stroke: '#E6EBF1',
        },
        text: {
          fontFamily: 'inherit',
          fill: '#B3BEC8',
          fontSize: '10px',
          lineHeight: '12px',
          fontWeight: 'bold',
        },
      },
      legend: {
        text: {
          fill: '#687386',
          fontSize: '12px',
          lineHeight: '12px',
          fontWeight: 'bold',
          fontFamily: 'inherit',
        },
      },
    },
    grid: {
      line: {
        stroke: '#E6EBF1',
        strokeWidth: 1,
      },
    },
    crosshair: {
      line: {
        stroke: '#B3BEC8',
        strokeWidth: 1,
      },
    },
  };

  return (
    <div className="chart">
      <ResponsiveLine
        {...commonProperties}
        data={data}
        enableArea={true}
        areaOpacity={0.05}
        pointSize={6}
        areaBaselineValue={0}
        theme={customTheme}
        sliceTooltip={({ slice }) => {
          return (
            <div className="tooltip">
              {slice.points.map((point: any) => {
                const yData = `${point.serieId}: $${point?.data?.yFormatted}`;
                const toolTip = point?.data?.tooltip;

                return (
                  <div key={point.id}>
                    <div className="color-gray-100 mb-1x">{toolTip || ''}</div>
                    <div>{!!toolTip ? yData : ''}</div>
                  </div>
                );
              })}
            </div>
          );
        }}
        axisBottom={{
          orient: 'bottom',
          tickValues: [`${xStartValue}`, `${xEndValue}`],
          tickPadding: 10,
        }}
      />
    </div>
  );
};

export default LineChart;
