import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Hero from '../Components/Hero';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import { blue } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';

const localizer = momentLocalizer(moment);

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
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
}));

function ResourceDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open, resources, selectedDate, addEvent } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = value => {
    console.log(value);
    addEvent(selectedDate, value);
    onClose(value);
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Select a course to study on {selectedDate}</DialogTitle>
      <List>
        {resources.map(resource => (
          <ListItem button onClick={() => handleListItemClick(resource.name)} key={resource.id}>
            <ListItemAvatar>
              <Avatar className={classes.avatar} src={resource.imageUrl}>
                A
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={resource.name} />
          </ListItem>
        ))}

        <ListItem button onClick={() => handleListItemClick('addAccount')}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="add account" />
        </ListItem>
      </List>
    </Dialog>
  )
}

function Course(props) {
  const { courseSlug } = props.match.params;
  const [course, setCourse] = useState({});
  const [resources, setResources] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [courseEvents, setCourseEvents] = useState([]);
  const members = course.members || [];
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = value => {
    setOpen(false);
    setSelectedValue(value);
  };

  const onSelectSlot = slot => {
    console.log(slot);
    const [selectedDate] = slot.slots;
    setSelectedDate(new Date(selectedDate).toLocaleDateString());
    handleOpen();
  }

  const addEvent = events => (date, name) =>
    events.concat([{
      start: new Date(date),
      end: new Date(date),
      title: name
    }])

  useEffect(() => {
    let socket = new WebSocket("ws://127.0.0.1:3030/ws");
    socket.onopen = (e) => {
      console.log("Successfully Connected");
      console.log(e);
      socket.send("Hi From the Client!")
    };
    
    socket.onclose = event => {
        console.log("Socket Closed Connection: ", event);
        socket.send("Client Closed!")
    };

    socket.onerror = error => {
        console.log("Socket Error: ", error);
    };
    const fetchCourse = async () => {
      let courseId;
      await fetch(`/api/v1/courses/${courseSlug}`)
        .then(res => res.json())
        .then(response => {
          courseId = response.id;
          setCourse(response);
        })
        .catch(error => console.log(error));
      await fetch(`/api/v1/courses/${courseId}/resources`)
        .then(res => res.json())
        .then(response => {
          let dates = []
          setResources(response);
          response.forEach(resource => {
            const { daysOfWeek } = resource;
            dates = dates.concat(daysOfWeek.map(day => ({
              start: new Date(new Date().setDate(day)),
              end: new Date(new Date().setDate(day)),
              title: resource.name
            })));
          });
          setCourseEvents(dates);
        })
        .catch(error => console.log(error));
    }
    fetchCourse();
  }, []);

  return (
    <Container>
      <Hero title={course.name} description={course.description} members={members.length} slug={course.slug}>
      </Hero>
      <Calendar
        localizer={localizer}
        events={courseEvents}
        style={{ height: "100vh" }}
        defaultDate={new Date()}
        defaultView="month"
        selectable
        onSelectSlot={onSelectSlot}
      />
      <ResourceDialog
        resources={resources}
        selectedDate={selectedDate}
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        addEvent={(date, name) => setCourseEvents(addEvent(courseEvents)(date,name))}
      />
    </Container>
  );
}

export default Course;
