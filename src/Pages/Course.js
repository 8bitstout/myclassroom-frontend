import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Hero from '../Components/Hero';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';

const localizer = momentLocalizer(moment);

const events = [
  {
    start: new Date(),
    end: new Date(moment().add(5, "days")),
    title: "Some title"
  }
];

function Course(props) {
  const { courseSlug } = props.match.params;
  const [course, setCourse] = useState({});
  const members = course.members || [];

  const onSelectSlot = slot => {
    console.log(slot);
    alert('Selected slot!')
  }

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
      <Calendar
        localizer={localizer}
        events={events}
        style={{ height: "100vh" }}
        defaultDate={new Date()}
        defaultView="month"
        selectable
        onSelectSlot={onSelectSlot}
      />
    </Container>
  );
}

export default Course;
