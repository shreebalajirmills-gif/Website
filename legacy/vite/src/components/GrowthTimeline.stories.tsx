import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import GrowthTimeline from './GrowthTimeline';

export default {
  title: 'Components/GrowthTimeline',
  component: GrowthTimeline,
} as ComponentMeta<typeof GrowthTimeline>;

const sampleData = [
  { year: 'FY26', revenue: 203, ebitdaVolume: 2.0, patMargin: 0.6 },
  { year: 'FY27', revenue: 260, ebitdaVolume: 10.0, patMargin: 1.5 },
  { year: 'FY28', revenue: 812, ebitdaVolume: 40.2, patMargin: 4.95 },
  { year: 'FY29', revenue: 903, ebitdaVolume: 43.2, patMargin: 4.78 },
  { year: 'FY30', revenue: 1006, ebitdaVolume: 50.5, patMargin: 2.98 },
];

const Template: ComponentStory<typeof GrowthTimeline> = (args) => <GrowthTimeline {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: sampleData,
  interactive: true,
  showChart: true,
};
