import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import viewWorkoutList from './viewWorkoutReducer';
import workoutDetailList from './workoutDetailReducer';

const store = combineReducers({
  user,
  login,
  viewWorkoutList,
  workoutDetailList,
});

export default store;
