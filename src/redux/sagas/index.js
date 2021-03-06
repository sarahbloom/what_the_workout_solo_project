import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import viewWorkoutList from './viewWorkoutSaga';
import workoutDetailSaga from './workoutDetailSaga';
import createWorkoutSaga from './createWorkoutSaga';
import deleteWorkoutSaga from './deleteWorkoutSaga';
import editExerciseSaga from './editExerciseSaga';
import startSessionSaga from './startSessionSaga';
import laseSessionSaga from './getSessionDateSaga'

export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    viewWorkoutList(),
    workoutDetailSaga(),
    createWorkoutSaga(),
    deleteWorkoutSaga(),
    editExerciseSaga(),
    startSessionSaga(),
    laseSessionSaga(),
    // watchIncrementAsync()
  ]);
}
