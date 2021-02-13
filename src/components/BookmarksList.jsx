import React, {useEffect} from 'react';
import {useQuery} from "@apollo/react-hooks";
import {Typography, makeStyles, CircularProgress} from "@material-ui/core";
import {FIND_REPOS} from "../utils/queries";
import Repository from "./Repository";

const useStyles = makeStyles({
  note: {
    marginTop: '1rem',
    textAlign: 'center',
  },
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '1rem'
  }
});

const BookmarksList = () => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const {data, loading, error} = useQuery(FIND_REPOS);

  useEffect(() => {
  }, [data]);

  if (loading) {
    return (
      <div className={classes.spinnerContainer}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    console.log(error);
    return (
      <Typography
        variant={'overline'}
        className={classes.note}
        component={'div'}
        color={'error'}
      >
        Something went wrong. Check console for details
      </Typography>
    )
  }

  return (
    <div>
      {bookmarks.map((repo, i) => (
        <Repository
          repo={repo}
          position={i+1}
          key={i}
        />
      ))}
    </div>
  );
};

export default BookmarksList;
