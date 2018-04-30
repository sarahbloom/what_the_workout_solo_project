import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import viewWorkoutList from './viewWorkoutReducer';

const store = combineReducers({
  user,
  login,
  viewWorkoutList,
});

export default store;
