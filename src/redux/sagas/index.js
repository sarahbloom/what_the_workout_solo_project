import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import viewWorkoutList from './viewWorkoutSaga';
import workoutDetailSaga from './workoutDetailSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    viewWorkoutList(),
    workoutDetailSaga(),
    // watchIncrementAsync()
  ]);
}
