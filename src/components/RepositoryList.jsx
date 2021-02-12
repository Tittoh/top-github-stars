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

const RepositoryList = () => {
  const classes = useStyles();
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
    return (
      <Typography
        variant={'overline'}
        className={classes.note}
        component={'div'}
        color={'error'}
      >
        {error}
      </Typography>
    )
  }

  return (
    <div>
      {data.search.edges.map((repo, i) => (
        <Repository
          repo={repo}
          position={i+1}
          key={i}
        />
      ))}
    </div>
  );
};

export default RepositoryList;