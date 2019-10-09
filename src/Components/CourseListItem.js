import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

function CourseListItem(props) {
  const { course, to } = props;
  const classes = useStyles();

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((linkProps, ref) => (
        <Link to={to} {...linkProps} ref={ref} />
      )),
      [to],
  );

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

  return (
    <li>
      <ListItem button alignItems="flex-start" component={renderLink}>
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
    </li>
  );
}

export default CourseListItem;
