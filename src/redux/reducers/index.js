import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import viewWorkoutList from './viewWorkoutReducer';
import workoutDetailList from './workoutDetailReducer';
import createWorkoutExerciseList from './createWorkoutReducer';
import editSingleExerciseList from './editExerciseReducer';
import startSessionList from './startSessionReducer'

const store = combineReducers({
  user,
  login,
  viewWorkoutList,
  workoutDetailList,
  createWorkoutExerciseList,
  editSingleExerciseList,
  startSessionList,
});

export default store;
