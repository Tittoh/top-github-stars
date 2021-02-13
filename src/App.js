import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './utils/client';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from './components/AppBar'
import RepositoryList from './components/RepositoryList'
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(5)
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <ApolloProvider client={client}>
      <AppBar />
      <Container maxWidth="md" className={classes.root}>
        <RepositoryList />
      </Container>
    </ApolloProvider>
    );
}

export default App;
