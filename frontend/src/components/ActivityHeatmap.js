import { ResponsiveHeatMap } from '@nivo/heatmap';

const ActivityHeatmap = ({ data }) => (
  <div style={{ height: '400px' }}>
    <ResponsiveHeatMap
      data={data}
      keys={['sleep', 'exercise']}
      indexBy="day"
      margin={{ top: 50, right: 90, bottom: 60, left: 90 }}
      axisTop={{
        tickSize: 5,
        tickPadding: 5,
        legend: '',
        legendOffset: 46
      }}
      colors={{
        type: 'sequential',
        scheme: 'blues'
      }}
      animate={true}
      hoverTarget="cell"
    />
  </div>
);

export default ActivityHeatmap;