import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import GroupIcon from '@material-ui/icons/Group';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import ShareIcon from '@material-ui/icons/Share';
import Link from '@material-ui/core/Link';
import styled from 'styled-components';
import { GoogleLogin } from 'react-google-login';

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

function handleClick(event) {
  event.preventDefault();
  alert('You clicked a breadcrumb.');
}

export default function Hero(props) {
  const classes = useStyles();
  const toolbarStyle = { backgroundImage: props.courseImage }
  const { responseGoogle } = props;

  return (
    <HeroContainer>
      <HeroTitle>
        {props.title}
      </HeroTitle>
      <HeroDescription>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/">
            home
          </Link>
          <Link color="inherit" href="/courses">
            courses
          </Link>
          <Typography color="textPrimary">{props.slug}</Typography>
        </Breadcrumbs>
        <p>
          {props.description}
        </p>
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
        startIcon={<AddIcon />}
        onClick={() => window.open('http://localhost:3030/GoogleLogin', '_blank')}
      >
        Join
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<ShareIcon />}
      >
        Share
      </Button>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText='Sync Calendar'
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </HeroContainer>
  );
}