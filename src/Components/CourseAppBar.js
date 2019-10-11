import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import styled from 'styled-components';

const Hero = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${props => props.imageUrl});
  height: 50%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

const HeroTitle = styled.h1`
  font-size: 5em;
  margin-top: 0;
  margin-bottom: 0.5em;
`

const HeroText = styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
`

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  }
}));

export default function DenseAppBar(props) {
  const classes = useStyles();
  const toolbarStyle = { backgroundImage: props.courseImage }

  return (
    <Hero imageUrl={props.courseImage}>
      <div className="hero-inner">
        <HeroText>{props.courseImage}</HeroText>
      </div>
    </Hero>
  );
}