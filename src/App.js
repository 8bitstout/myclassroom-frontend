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
import CourseListItem from './Components/CourseListItem';

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

const renderLink = React.useMemo(
  () =>
    React.forwardRef((linkProps, ref) => (
      <Link to={to} {...linkProps} ref={ref} />
    )),
    [to],
);

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
  }, []);

  return (
    <Container maxWidth="sm">
      <List className={classes.root}>
        {courses.map(course => (
          <>
            <CourseListItem course={course} to={`/courses/${course.slug}`} />
            <Divider variant="inset" component="li" />
          </>
        ))}
      </List>
    </Container>
  );
}

export default App;
