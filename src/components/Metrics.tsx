import React, { useState } from 'react';
import { useQuery } from 'urql';
import { makeStyles } from '@material-ui/core/styles';
import ChartContainer from './ChartContainer';

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
  const classes = useStyles();
  const [result] = useQuery({
    query: metrics,
  });
  const [newMetric, setNewMetric] = useState({
    value: 'Please Select a Metric Above',
  });

  console.log(newMetric.value, 'this is new Metric');

  const changeFunction = e => {
    const newValue = e.target.value;
    setNewMetric({ value: newValue });
  };

  const { data, fetching, error } = result;

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
