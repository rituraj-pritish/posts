import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  copyright: {
    color: theme.palette.text.primary,
    textAlign: 'center'
  }
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <p className={classes.copyright}>
        &copy; {new Date().getFullYear()} <b>Posts</b>
      </p>
    </div>
  );
};

export default Footer;
