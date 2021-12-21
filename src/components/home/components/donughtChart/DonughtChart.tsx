import React from 'react';
import { ResponsivePie } from '@nivo/pie';

interface DonughtChartProps {
  data: object[];
}
/**
 * Donught Chart component.
 *
 * @returns {ReactElement}
 */
const DonughtChart: React.FC<DonughtChartProps> = (props): React.ReactElement => {
  const { data } = props;

  const customTheme: object = {
    legends: {
      text: {
        fontSize: 14,
        color: '#31325C',
        position: 'absolute',
      },
    },
  };

  const customLegend: any[] = [
    {
      anchor: 'right',
      direction: 'column',
      justify: false,
      translateX: 160,
      translateY: 0,
      itemsSpacing: 13,
      itemWidth: 100,
      itemHeight: 20,
      itemDirection: 'left-to-right',
      itemOpacity: 0.85,
      itemTextColor: '#ffffff',
      symbolSize: 18,
      symbolShape: 'circle',
      effects: [
        {
          on: 'hover',
          style: {
            itemTextColor: '#000',
          },
        },
      ],
    },
  ];

  return (
    <ResponsivePie
      data={data}
      margin={{ top: 10, right: 200, bottom: 10, left: 10 }}
      innerRadius={0.65}
      colors={{ datum: 'data.color' }}
      enableRadialLabels={false}
      radialLabelsSkipAngle={10}
      radialLabelsTextColor="#31325C"
      enableSliceLabels={false}
      sliceLabelsSkipAngle={10}
      sliceLabelsTextColor="#31325C"
      tooltip={({ datum }) => {
        return (
          <div className="tooltip tooltip--donught">
            <span className="tooltip__bulb" style={{ backgroundColor: `${datum.color}` }} />
            <span className="text-bold color-gray-75 helper">{datum.label}</span>
            <div className="text-bold mt-1x">{datum.value}</div>
          </div>
        );
      }}
      theme={customTheme}
      legends={customLegend}
    />
  );
};

export default DonughtChart;
