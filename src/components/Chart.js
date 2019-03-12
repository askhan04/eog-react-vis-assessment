import React from 'react';
import Plot from 'react-plotly.js';
// use moment library to simplify unix/epoch time conversion
import moment from 'moment';

const Chart = props => {
  const { plotData } = props;

  const xvals = plotData.map(point => {
    return moment(point.timestamp).format('HH:mm:ss');
  });
  const yvals = plotData.map(point => {
    return point.metric;
  });
  const trace = {
    x: xvals,
    y: yvals,
    mode: 'lines',
    connectgaps: true
  };

  const layout = {
    title: 'Drone Temperature',
    xaxis: {
      title: 'Time'
    },
    yaxis: {
      title: 'Temperature (F)'
    },
    autosize: true
  };

  return (
    <React.Fragment>
      <Plot
        data={[trace]}
        layout={layout}
        style={{ width: '100%', height: '100%' }}
        useResizeHandler={true}
      />
    </React.Fragment>
  );
};

export default Chart;
