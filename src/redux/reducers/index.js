import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import viewWorkoutList from './viewWorkoutReducer';
import workoutDetailList from './workoutDetailReducer';
import createWorkoutExerciseList from './createWorkoutReducer'
import editExerciseList from './editExerciseReducer'

const store = combineReducers({
  user,
  login,
  viewWorkoutList,
  workoutDetailList,
  createWorkoutExerciseList,
  editExerciseList,
});

export default store;
