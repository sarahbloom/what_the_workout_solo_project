import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//delete a workout and any completed sessions with the workout ID
function* deleteWorkout (action){
    // console.log('in deleteWorkout saga', action);
    try {
        yield call(axios.delete, `/api/workout/${action.payload}`)
        yield put({
            type: 'GET_WORKOUT'
        })
    } catch (error) {
        console.log('error in deleteWorkoutSaga', error);
        //TODO: add alert box
    }
}

function* deleteWorkoutSaga() {
    yield takeEvery('DELETE_WORKOUT', deleteWorkout)
}
export default deleteWorkoutSaga