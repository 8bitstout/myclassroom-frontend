import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import GroupIcon from '@material-ui/icons/Group';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import ShareIcon from '@material-ui/icons/Share';
import styled from 'styled-components';

const HeroContainer = styled.div`
  padding: 4rem 2rem;
  margin-bottom: 2rem;
  background-color: #e9ecef;
  border-radius: .3rem;
`

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 300;
  line-height: 1.2;
`
const HeroDescription = styled.p`
  font-size: 1.25rem;
  font-weight: 300;
  margin-top: 0;
  margin-bottom: 1rem;
`
const HeroContent = styled.p`
  margin-top: 0;
  margin-bottom: 1rem;
`

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  margin: {
    margin: theme.spacing(2),
  },
  padding: {
    padding: theme.spacing(0, 2),
  },
}));

export default function Hero(props) {
  const classes = useStyles();
  const toolbarStyle = { backgroundImage: props.courseImage }

  return (
    <HeroContainer>
      <HeroTitle>
        {props.title}
      </HeroTitle>
      <HeroDescription>
        {props.description}
      </HeroDescription>
      <hr style={{ marginBottom: '1.5rem', marginTop: '1.5rem'}} />
      <HeroContent>
        <Badge className={classes.margin} badgeContent={props.members} color="primary">
          <GroupIcon />
        </Badge>
        <Badge className={classes.margin} badgeContent={4} color="primary">
          <CallSplitIcon />
        </Badge>
      </HeroContent>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<ShareIcon />}
      >
        Share Course
      </Button>
    </HeroContainer>
  );
}