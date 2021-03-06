import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row-reverse',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  card: {
    minWidth: 275,
    maxWidth: 300,
    marginTop: 15,
    marginLeft: 15,
    display: 'flex',
    borderRadius: 10,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function ChartIndicator({ props }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {props[0]}
          </Typography>
          <Typography variant="h2" component="h2">
            {props[1][props.length - 1]}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
