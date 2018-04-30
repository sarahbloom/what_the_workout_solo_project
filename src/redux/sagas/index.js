import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import getWorkoutSaga from './viewWorkoutSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    getWorkoutSaga(),
    // watchIncrementAsync()
  ]);
}
