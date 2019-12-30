import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    background: theme.palette.bg,
    opacity: '0.5',
    zIndex: '100'
  },

  circle: {
    position: 'relative',
    width: '25px',
    height: '25px',
    background: theme.palette.text.primary,
    borderRadius: '50px',
    cursor: 'pointer',
    opacity: '0.6',
    animation: '$big 2s ease-in-out 0.5s infinite backwards '
  },

  '@keyframes big': {
    '0%': {
      transform: ' scale(0)'
    },

    '50%': {
      transform: 'scale(2)'
    },

    '100%': {
      transform: 'scale(0)'
    }
  }
}));

const Loader = () => {
  const classes = useStyles();
  return (
    <div className={classes.overlay}>
      <div className={classes.circle} />
      <div className={classes.circle} />
    </div>
  );
};

export default Loader;
