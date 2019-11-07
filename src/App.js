import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import Container from '@material-ui/core/Container';
import Home from './Pages/Home.js';
import Course from './Pages/Course.js';
import Callback from './Pages/Callback.js';
import Auth from './Auth/Auth.js';

function App(props) {
  console.log(props);
  const auth = new Auth(props.history)
  return (
    <Container maxWidth="lg">
      <Switch>
        <Route path="/courses/:courseSlug" component={Course} />
        <Route path="/callback" render={props => <Callback auth={auth} {...props} />} />
        <Route path="/" render={props => <Home auth={auth} {...props} />} />
      </Switch>
    </Container>
  );
}

export default App;
