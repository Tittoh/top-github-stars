import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import StarOutlineRoundedIcon from '@material-ui/icons/StarOutlineRounded';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { Chip } from '@material-ui/core';


import nFormatter from '../utils/nFormatter'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing(1)
  },
  position:{
    color: '#555'
  },
  starChip: {
    fontSize: theme.typography.pxToRem(16)
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: 500,
    flexBasis: '33.33%',
    flexShrink: 0,
    textTransform: 'capitalize'
  },
  description: {
    fontSize: theme.typography.pxToRem(16),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    color: theme.palette.text.primary,
  },
  updated: {
    fontSize: theme.typography.pxToRem(12),
    color: theme.palette.text.secondary,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  owner: {
    width: '100%',
    fontWeight: 600,
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Repository({repo, position}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const {node: {name, description, owner, updatedAt,
    stargazers: {totalCount}, forkCount, url, languages:{nodes},}} = repo;
  const language = nodes[0] ? { name:nodes[0].name, color:nodes[0].color } : {name: "", color: "transparent"}
  const styles = {
    dotStyle: {
      color: language.color,
      verticalAlign: "bottom"
    },
  }
  return (
      <Accordion expanded={expanded === position} onChange={handleChange(position)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`"content-panel"+${position}`}
          id={`"header-panel"+${position}`}
        >
          <Grid container>
            <Grid item xs={1}><Typography className={classes.position} variant="h6">{position}.</Typography></Grid>
            <Grid item xs={9}>
              <Typography variant="h6" className={classes.heading}>
                {name}
              </Typography>
            </Grid>
            <Chip icon={<StarOutlineRoundedIcon />}
              variant="outlined"
              label={nFormatter(totalCount)}/>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container direction="row">
            <Grid itemxs={6} sm={8}>
              <Typography>Owner:<a  className={classes.owner} href={owner.url}> {owner.login}</a></Typography>
              <Typography className={classes.updated}>{`Updated: ${Date(updatedAt).split("G")[0]}`}</Typography>
            </Grid>
            <Grid item sm={12} className={classes.description}>
              {description}
            </Grid>
            <Grid item xs={6} sm={4}>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                className={classes.button}
                startIcon={<BookmarkIcon />}
              >
                Bookmark
              </Button>
            </Grid>
            <Grid item xs={6} sm={3}>
              <a  className={classes.github} href={url}> Repository</a>
            </Grid>
            <Grid item xs={6} sm={3}>
              Forks: {nFormatter(forkCount)}
            </Grid>
            <Grid item xs={6} sm={2}>
              <Grid container direction="row" alignItems="center">
                <Grid item><FiberManualRecordIcon style={styles.dotStyle}/></Grid>
                <Grid item>{language.name}</Grid>
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
  );
}
