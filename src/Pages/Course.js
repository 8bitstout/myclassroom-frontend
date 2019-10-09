import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';

function Course(props) {
  const { courseSlug } = props.match.params;
  const [course, setCourse] = useState({});

  useEffect(() => {
    fetch(`/api/v1/courses/${courseSlug}`)
      .then(res => res.json())
      .then(response => {
        console.log(response);
        setCourse(response);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <Container maxWidth="sm">
      {course.name}
    </Container>
  );
}

export default Course;
