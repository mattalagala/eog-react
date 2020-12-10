import React from 'react';
import { Provider, createClient, subscriptionExchange, defaultExchanges } from 'urql';
import Chart from './Chart';
import { SubscriptionClient } from 'subscriptions-transport-ws';

const subscriptionClient = new SubscriptionClient('ws://react.eogresources.com/graphql', {});

const client = createClient({
  url: 'ws://react.eogresources.com/graphql',
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({ forwardSubscription: operation => subscriptionClient.request(operation) }),
  ],
});

const ChartContainer = ({ value }) => (
  <Provider value={client}>
    <Chart value={value} />
  </Provider>
);

export default ChartContainer;
