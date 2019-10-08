import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

function App() {
  const [courses, setCourses] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    fetch('/api/v1/courses')
      .then(res => res.json())
      .then(response => {
        console.log(response);
        setCourses(response);
      })
      .catch(error => console.log(error));
  }, [courses]);

  return (
    <Container maxWidth="sm">
      <List className={classes.root}>
        {courses.map(course => (
          <>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar src={course.resources[0].imageUrl}/>
              </ListItemAvatar>
              <ListItemText
                primary={course.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                    Members: {course.members.length} <br/>
                    Resources: {course.resources.length} <br/>
                    Hours Per Week: {course.hoursPerWeek}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        ))}
      </List>
    </Container>
  );
}

export default App;
