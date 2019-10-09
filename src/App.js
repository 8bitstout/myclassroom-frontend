import React, { useState, useEffect } from 'react';
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
        <Route path="/courses/:courseSlug">
          <Course />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
