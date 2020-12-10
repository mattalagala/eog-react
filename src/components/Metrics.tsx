import React, { useState } from 'react';
import { useQuery } from 'urql';
import { makeStyles } from '@material-ui/core/styles';
import ChartContainer from './ChartContainer';

// Initial query to get available equipment for user
const metrics = `{
    getMetrics    
    }`;

const useStyles = makeStyles({
  select: {
    minWidth: 250,
    minHeight: 35,
    backgroundColor: 'white',
    marginTop: 15,
    marginLeft: 15,
    display: 'flex',
    borderRadius: 4,
  },
  div: {
    display: 'flex',
    flexDirection: 'row-reverse',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function Metrics() {
  // useStyle class
  const classes = useStyles();

  // Subscriptoin function data
  const [result] = useQuery({
    query: metrics,
  });

  // Drop down data with initial value as state
  const [newMetric, setNewMetric] = useState({
    value: 'Please Select a Metric Above',
  });

  // Select onChange function to set state for chart render
  const changeFunction = (e: any) => {
    const newValue = e.target.value;
    setNewMetric({ value: newValue });
  };

  const { data, fetching, error } = result;
  if (data) {
    return data;
  }
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  let count = 0;

  return (
    <div>
      <div className={classes.div}>
        <select onChange={changeFunction} name="Metrics" id="Metrics" className={classes.select}>
          <option label="Select" value="empty" key={count}>
            {' '}
          </option>
          {data.getMetrics.map((item: any) => (
            <option label={item} value={item} key={count++}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <ChartContainer {...newMetric} />
    </div>
  );
}

export default Metrics;
