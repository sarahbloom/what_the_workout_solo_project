import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import viewWorkoutList from './viewWorkoutReducer';
import workoutDetailList from './workoutDetailReducer';
import createWorkoutExerciseList from './createWorkoutReducer'

const store = combineReducers({
  user,
  login,
  viewWorkoutList,
  workoutDetailList,
  createWorkoutExerciseList,
});

export default store;
