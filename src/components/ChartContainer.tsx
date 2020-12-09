import React from 'react';
import { Provider, createClient } from 'urql';
import Chart from './Chart';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const ChartContainer = ({ value }) => (
  <Provider value={client}>
    <Chart value={value} />
  </Provider>
);

export default ChartContainer;
