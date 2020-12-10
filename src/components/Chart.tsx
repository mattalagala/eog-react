import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSubscription } from 'urql';
import { Line, LineChart, XAxis, YAxis, Tooltip } from 'recharts';
import ChartIndicator from './ChartIndicator';

// Define styles for this component. Chose to set styles locally instead of globally.
const useStyles = makeStyles({
  root: {
    width: 1280,
    height: 720,
    backgroundColor: '##dcdde1',
    paddingTop: 25,
    paddingBottom: 25,
    marginTop: 15,
    marginLeft: 15,
    display: 'flex',
  },
  div: {
    width: 200,
    height: 300,
    marginTop: 15,
    marginLeft: 15,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

let newData: any = { value: 'initial' };

const newQuery = `subscription newSub { 
  newMeasurement{
    metric
    at
    value
    unit
  }
}`;

function Chart(props) {
  // Classes variable for useStyles
  const classes = useStyles();

  const metricName = props.value;

  // Subscription function passed in query and user input from Select
  const [result] = useSubscription({
    query: newQuery,
    variables: { metricName },
  });

  // Immutable object data.result

  const { data, fetching, error } = result;
  const testThisData = () => {
    if (data) {
      return data.newMeasurement;
    }
    if (fetching) return <p>Loading...</p>;
    if (error) return <p>Oh no... {error.message}</p>;
  };

  // Used a function call because useEffect can't come after a conditional
  const subscriptionData = testThisData();

  // State Hook
  const [psiData, setPsiData] = useState([newData]);

  // Subscription useEffect
  useEffect(() => {
    // Keeps iterrable array at length 30 so that data is readable
    if (testData.length >= 30) {
      testData.shift();
    }

    if (psiData.length >= 300) {
      psiData.shift();
    }
    // Set state when data (subscription) changes
    setPsiData(psiData => [...psiData, subscriptionData]);
  }, [data]);

  // Conditional useEffect to set empty array when no selection has been made
  useEffect(() => {
    if (metricName === 'initial') {
    } else {
      setPsiData(psiData => [(psiData = [])]);
    }
  }, [metricName]);

  // State parsed into an array and time converted to UTC
  const testData = psiData
    .filter(items => items.metric === metricName)
    .map(items => {
      const dt = new Date(parseInt(items.at) * 1000);
      const hr = dt.getUTCHours();
      const m = '0' + dt.getUTCMinutes();
      const convTime = hr + ':' + m.substr(-2);
      items.at = convTime;
      return items;
    });

  return (
    <div>
      <ChartIndicator props={[metricName]} />
      <div className={classes.root}>
        <LineChart height={640} width={1280} margin={{ top: 20, right: 30, left: 20, bottom: 30 }} data={testData}>
          <XAxis dataKey="at" label={{ value: 'Time', position: 'bottom' }} />
          <YAxis />
          <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
          <Tooltip />
        </LineChart>
      </div>
    </div>
  );
}
export default Chart;
