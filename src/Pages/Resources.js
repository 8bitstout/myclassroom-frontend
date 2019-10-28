import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  card: {
  },
  media: {
  },
});

function Resources(props) {
  const [resources, setResources] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    fetch(`/api/v1/courses/${props.courseId}/resources`)
      .then(res => res.json())
      .then(response => {
        console.log(response);
        setResources(response);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <Grid container spacing={24} style={{width: '100%'}}>
      {resources.map(({ name, author, imageUrl, url }) => (
        <Grid item md={3}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                image={imageUrl}
                title={name}
                className={classes.media}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {author.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {name}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                <a href={url}>Get Resource</a>
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Resources;
