import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';
import { Bookmarks } from '@material-ui/icons';
import BookmarksModal from './Bookmarks';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [bookmarks, setBookmarks] = React.useState({});
  const handleOpen = () => {
    getBookmarks();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (keyName) => {
    localStorage.removeItem(keyName)
    getBookmarks()
  }

  const getBookmarks = () =>{
    setBookmarks(Object.keys(localStorage).reduce(function(obj, str) {
      obj[str] = localStorage.getItem(str); 
      return obj
      }, {}));
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Container maxWidth="md">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Top Github Repositories
          </Typography>
          <Button
            variant="outlined"
            color="inherit"
            size="small"
            onClick={handleOpen}
            open={open}
            startIcon={<Bookmarks />}
          >
            Bookmarks
          </Button>
        </Toolbar>
        </Container>
      </AppBar>
      <BookmarksModal
      bookmarks={bookmarks} 
      open={open}
      handleDelete={handleDelete}
      onClose={handleClose}/>
    </div>
  );
}