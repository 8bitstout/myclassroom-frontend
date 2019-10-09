import React from 'react';
import Container from '@material-ui/core/Container';

function Course(props) {
  const course = props.location.state;

  return (
    <Container maxWidth="sm">
      {course.name}
    </Container>
  );
}

export default Course;
