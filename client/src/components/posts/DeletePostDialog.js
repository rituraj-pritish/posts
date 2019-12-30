import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  black: {
    color: '#000 !important'
  },
  deleteButton: {
    backgroundColor: theme.palette.delete
  }
}));

const DeletePostDialog = ({ setOpen, open, handleDelete }) => {
  const classes = useStyles();
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title' className={classes.black}>
        {'Delete Post'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id='alert-dialog-description'
          className={classes.black}
        >
          Sure to delete this post, this can't be undone ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          className={classes.black}
          color='secondary'
          autoFocus
        >
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          color='secondary'
          className={classes.deleteButton}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default DeletePostDialog;
