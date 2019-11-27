import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
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
      <DialogTitle id='alert-dialog-title'>
        {"Use Google's location service?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Sure to delete this post, this can't be undone ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='secondary' autoFocus>
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
