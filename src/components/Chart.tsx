import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery, useSubscription } from 'urql';
import { Line, LineChart, XAxis, YAxis, Tooltip, Label } from 'recharts';
import ChartIndicator from '../components/ChartIndicator';

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
  console.log(test, 'this from add time');
}

function Chart(props) {
  const classes = useStyles();
  console.log(props.value, 'THIS IS VALUE FROM CHARTS');
  const metricName = props.value;
  const [psiData, setPsiData] = useState([newData]);

  const newQuery = `query($metricName: String!){
    getLastKnownMeasurement(metricName:$metricName){metric,at,value,unit}    
    }`;

  const [result, reexecuteQuery] = useQuery({
    query: newQuery,
    variables: { metricName },
    pollInterval: 5000,
    requestPolicy: 'cache-and-network',
  });
  const { data, fetching, error } = result;

  console.log(result, 'THIS IS CONSOLE RESULT');

  useEffect(() => {
    count++;
    // console.log(count, 'THIS IS useEffect')

    // setPsiData([newData])
    if (psiData.length >= 30) {
      psiData.shift();
    }
    setPsiData(psiData => [...psiData, newData]);
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
  console.log(psiData);
  if (fetching) return <p>Loading...</p>;
  if (error) {
    console.log(error.message);
    return <p></p>;
  }
  if (data) {
    newData = data.getLastKnownMeasurement;
    newData.test1 = '233';
    addTime();
  }

  const testData = psiData[psiData.length - 1]['value'];

  return (
    <div>
      <ChartIndicator props={[metricName, testData]} />
      <div className={classes.root}>
        <LineChart height={640} width={1280} margin={{ top: 20, right: 30, left: 0, bottom: 0 }} data={psiData}>
          <XAxis dataKey="at">
            <Label value="time" offset={0} position="insideLeft" />
          </XAxis>
          <YAxis label="test" />
          <Line dataKey="value" />
          <Tooltip />
        </LineChart>
      </div>
    </div>
  );
}
export default Chart;
