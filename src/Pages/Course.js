import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import CourseAppBar from '../Components/CourseAppBar'
import Hero from '../Components/Hero';

function Course(props) {
  const { courseSlug } = props.match.params;
  const [course, setCourse] = useState({});
  const members = course.members || [];

  useEffect(() => {
    fetch(`/api/v1/courses/${courseSlug}`)
      .then(res => res.json())
      .then(response => {
        setCourse(response);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <Container>
      <Hero title={course.name} description={course.description} members={members.length} slug={course.slug}>
      </Hero>
    </Container>
  );
}

export default Course;
