import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import Container from '@material-ui/core/Container';
import Home from './Pages/Home.js';
import Course from './Pages/Course.js';

function App() {
  return (
    <Container maxWidth="sm">
      <Switch>
        <Route path="/courses/:courseSlug" component={Course} />
        <Route path="/" component={Home} />
      </Switch>
    </Container>
  );
}

export default App;
