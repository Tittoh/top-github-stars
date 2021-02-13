import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';
import { Bookmarks } from '@material-ui/icons';
import BookmarksModal from './Bookmarks';

import db from '../utils/firebase'

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
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '1rem'
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [bookmarks, setBookmarks] = React.useState([]);
  const [error, setError] = React.useState("");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (name) => {
    db.collection("bookmarks").doc(name).delete().then(() => {
      console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
    getBookmarks()
  }

  const getBookmarks = () =>{
    let data = []
    setLoading(true)
    db.collection("bookmarks").get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          data.push(doc.data())
          setLoading(false)
        });
        setBookmarks(data)
    })
    .catch((error) => {
      setLoading(false)
      setError(error)
    });
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
            onClick={() =>{getBookmarks(); handleOpen();}}
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
      loading={loading}
      error={error}
      open={open}
      handleDelete={handleDelete}
      onClose={handleClose}/>
    </div>
  );
}