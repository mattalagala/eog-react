import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 300,
    backgroundColor: 'white',
    marginTop: 15,
    marginLeft: 15,
    display: 'flex',
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

export default function ChartIndicator({ props }) {
  console.log(props, 'this is props@@@@@@');
  const classes = useStyles();
  return (
    <div className={classes.div}>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {props[0]}
          </Typography>
          <Typography variant="h5" component="h2">
            {props[1]}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
