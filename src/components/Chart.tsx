import React, { useState, useEffect } from 'react';
// import { Line } from 'react-chartjs-2'
import { useQuery } from 'urql';

import { Line, LineChart, XAxis, YAxis, Tooltip } from 'recharts';

const newQuery = `{
  getLastKnownMeasurement(metricName:"casingPressure"){value,at}    
  }`;

let newData: any = {};

let count = 0;

function addTime() {
  const epochConv = new Date(newData.at);
  const test = epochConv.getTime();
  console.log(test, 'this from add time');
}

function Chart() {
  const [psiData, setPsiData] = useState([newData]);

  const [result, reexecuteQuery] = useQuery({
    query: newQuery,
    pollInterval: 5000,
    requestPolicy: 'cache-and-network',
  });
  const { data, fetching, error } = result;

  useEffect(() => {
    count++;
    // console.log(count, 'THIS IS useEffect')

    // setPsiData([newData])
    if (psiData.length >= 30) {
      psiData.shift();
    }
    setPsiData(psiData => [...psiData, newData]);
  }, [data]);

  // console.log(psiData, "THIS IS PSIDATA")

  // console.log("YOOO", newData)

  const time = new Date(1234567890);
  const newTime = time.getTime();
  console.log(psiData);
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  if (data) {
    newData = data.getLastKnownMeasurement;
    newData.test1 = '233';
    addTime();
  }
  const testData = psiData[psiData.length - 1]['value'];

  console.log(testData, 'this is psiData');

  return (
    <div>
      <p>{testData}this is PSI Data</p>
      <h1>Real Time CPU Usage</h1>
      <LineChart width={1280} height={480} data={psiData}>
        <XAxis dataKey="at" />
        <YAxis />
        <Line dataKey="value" />
        <Line dataKey="test1" />
        <Tooltip />
      </LineChart>
    </div>
  );
}
export default Chart;
