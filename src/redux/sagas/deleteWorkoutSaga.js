import { call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* deleteWorkout (action){
    // console.log('in deleteWorkout saga', action);
    try {
        yield call(axios.delete, `/api/workout/${action.payload}`)
    } catch (error) {
        console.log('error in deleteWorkoutSaga', error);
        //TODO: add alert box
    }
}

function* deleteWorkoutSaga() {
    yield takeEvery('DELETE_WORKOUT', deleteWorkout)
}
export default deleteWorkoutSaga