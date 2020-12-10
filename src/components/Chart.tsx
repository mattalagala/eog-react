import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery, useSubscription } from 'urql';
import { Line, LineChart, XAxis, YAxis, Tooltip, Label, Legend } from 'recharts';
import ChartIndicator from './ChartIndicator';

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

let newData: any = {};

let count = 0;

function addTime() {
  const epochConv = new Date(newData.at);
  const test = epochConv.getTime();
}

const newQuery = `subscription newSub { 
  newMeasurement{
    metric
    at
    value
    unit
  }
}`;

// const handleSubscription = (test2: any = [], response: any) => {
//   return [response.newMeasurement, ...test2];
// };

function Chart(props) {
  const classes = useStyles();

  const metricName = props.value;
  console.log(metricName, 'THIS IS VALUE FROM CHARTS');

  const [result] = useSubscription(
    {
      query: newQuery,
      variables: { metricName },
    },
    // handleSubscription,
  );
  const { data, fetching, error } = result;
  let newArr = [] as any;
  const testThisData = () => {
    if (data) {
      return data.newMeasurement;
    }
    if (fetching) return <p>Loading...</p>;
    if (error) return <p>Oh no... {error.message}</p>;
  };

  const somethingElse = testThisData();

  const [psiData, setPsiData] = useState([newData]);

  console.log(somethingElse, '------------ data ---------------');

  useEffect(() => {
    if (testData.length >= 25) {
      psiData.shift();
    }
    setPsiData(psiData => [...psiData, somethingElse]);
  }, [data]);

  useEffect(() => {
    if (metricName === 'test') {
      console.log(metricName, 'THIS IS INITIAL VALUE');
    } else {
      setPsiData(psiData => [(psiData = [])]);
    }
  }, [metricName]);

  const time = new Date(1234567890);
  const newTime = time.getTime();

  addTime();

  const testData = psiData
    .filter(items => items.metric === metricName)
    .map(items => {
      const dt = new Date(parseInt(items.at) * 1000);
      const hr = dt.getUTCHours();
      const m = '0' + dt.getUTCMinutes();
      const convTime = hr + ':' + m.substr(-2);
      items.at = convTime;
      console.log(convTime, '----------strLoc ------------');
      return items;
    });
  console.log(psiData, 'THIS IS !!!!!!!!!!psiData!!!!!!!!!!!!!');

  const test = metricName !== 'test';
  console.log(testData[testData.length - 1], 'THIS IS !!!!!!!!!!testData!!!!!!!!!!!!!');
  const newValue = testData[testData.length - 1];
  return (
    <div>
      {test && <ChartIndicator props={[metricName]} />}

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
