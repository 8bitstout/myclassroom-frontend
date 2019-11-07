import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

function Callback(props) {
  const classes = useStyles();
  useEffect(() => {
    console.log('Callback url');
    // Handle authentication if expected values are in the URL
    if (/access_token|id_token|error/.test(props.location.hash)) {
      props.auth.handleAuthentication();
    } else {
      throw new Error("Invalid callback URL");
    }
  });
  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  )
}

export default Callback;
