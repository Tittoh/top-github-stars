import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { ListItemSecondaryAction, IconButton, Typography, CircularProgress } from '@material-ui/core';
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
  const { onClose, selectedValue, open, loading, error, bookmarks, handleDelete } = props;
  
  const handleClose = () => {
    onClose(selectedValue);
  };

  const renderBookmarks = (bookmarks, loading, error) => {
    if (bookmarks.length ===0 ) {
      return (
        <Typography variant="body" className={classes.list}>
          No bookmarks available
        </Typography>
      )
    }else if(loading){
        <div className={classes.spinnerContainer}>
          <CircularProgress />
        </div>
      
    }
      return(
        <React.Fragment>
          {bookmarks.map((bookmark, i) => (
            <ListItem key={i}>
              <Typography variant="body" className={classes.list}>
                <a href={bookmark.url}>{bookmark.name}</a>
              </Typography>
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => {handleDelete(bookmark.name)}}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </React.Fragment>
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
        {renderBookmarks(bookmarks, loading, error)}
      </List>
    </Dialog>
  );
}

BookmarksModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
