import React from 'react';
import { Provider, createClient } from 'urql';
import Metrics from '../components/Metrics';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

function MetricsContainer() {
  return (
    <Provider value={client}>
      <Metrics />
    </Provider>
  );
}

export default MetricsContainer;
