import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import CourseListItem from '../Components/CourseListItem';

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

function Home(props) {
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
      <button onClick={props.auth.login}>Login</button>
    </Container>
  );
}

export default Home;
