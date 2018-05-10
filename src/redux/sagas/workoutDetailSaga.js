import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//view the exercises associated with a specific workout ID
function* workoutDetail (action){
    try {
        const workoutDetailResponse = yield call(axios.get, `/api/workout/detail/${action.payload}`)
        yield put ({
            type: 'SET_WORKOUT_DETAILS',
            payload: workoutDetailResponse.data
        })
    } catch (error) {
        console.log('error in workoutDetail saga', error);
        //TODO: add alert box
    }
}

function* workoutDetailSaga() {
    yield takeEvery('DISPLAY_WORKOUT_DETAIL', workoutDetail)
}

export default workoutDetailSaga