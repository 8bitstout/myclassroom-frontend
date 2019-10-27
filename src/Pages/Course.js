import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Hero from '../Components/Hero';
import Modal from '@material-ui/core/Modal';
import Resources from './Resources';
import { makeStyles } from '@material-ui/core/styles';
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

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle(x, y) {
  const top = y //50 + rand();
  const left = x //50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: 750,
    height: 750,
    transform: 'translate(-50%, -50%)',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Course(props) {
  const { courseSlug } = props.match.params;
  const [course, setCourse] = useState({});
  const members = course.members || [];
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle, setModalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSelectSlot = slot => {
    console.log(slot);
    handleOpen();
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
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Text in a modal</h2>
          <p id="simple-modal-description">
            <Resources />
          </p>
        </div>
      </Modal>
    </Container>
  );
}

export default Course;
