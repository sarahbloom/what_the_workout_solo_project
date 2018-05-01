import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import ViewWorkout from './components/ViewWorkout/ViewWorkout';
import WorkoutDetail from './components/WorkoutDetail/WorkoutDetail';
import CreateWorkout from './components/WorkoutDetail/CreateWorkout/CreateWorkout';
import StartWorkout from './components/StartWorkout/StartWorkout';
import EditExercise from './components/EditExercise/EditExercise';

import './styles/main.css';

const App = () => (
  <div>
    <Header title="What the Workout" />
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/home"
          component={LoginPage}
        />
        <Route
          path="/register"
          component={RegisterPage}
        />
        <Route
          exact path="/viewworkout"
          component={ViewWorkout}
        />
        <Route
          path="/viewworkout/detail"
          component={WorkoutDetail}
        />
        <Route
          path="/editworkout"
          component={CreateWorkout}
        />
        <Route
          path="/editexercise"
          component={EditExercise}
        />
        <Route
          path="/startworkout"
          component={StartWorkout}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;
