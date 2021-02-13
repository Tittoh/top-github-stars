import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { ListItemSecondaryAction, IconButton, Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5),
    textAlign: 'center',
    minWidth: '30%'
  },
  title: {
    marginTop: theme.spacing(3)
  },
  number: {
    flexGrow:0,
  },
  list: {
    textAlign: 'left',
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(10),
    marginBottom: theme.spacing(3)
  },
}));

export default function BookmarksModal(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open, bookmarks, handleDelete } = props;
  
  const handleClose = () => {
    onClose(selectedValue);
  };

  const renderBookmarks = (bookmarks) => {
    if (Object.keys(bookmarks).length !== 0) {
      return (
        <React.Fragment>
          {Object.keys(bookmarks).map((keyName, i) => (
            <ListItem key={i}>
              <Typography variant="body" className={classes.list}>
                <a href={bookmarks[keyName]}>{keyName}</a>
              </Typography>
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => {handleDelete(keyName)}}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </React.Fragment>
      )
    }
    return(
      <ListItem>
        <Typography variant="body1" className={classes.list}>
          No bookmarks found
        </Typography>
      </ListItem>
    )
  }

  return (
    <Dialog
    className={classes.root}
    aria-labelledby="contact"
    open={open}
    onClose={handleClose}
    maxWidth="sm"
    >
      <DialogTitle className={classes.title} id="simple-dialog-title">Bookmarks</DialogTitle>
      <List className={classes.list}>
        {renderBookmarks(bookmarks)}
      </List>
    </Dialog>
  );
}

BookmarksModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
