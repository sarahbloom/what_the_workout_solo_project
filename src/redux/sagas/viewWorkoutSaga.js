import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* viewWorkout(action){
    // console.log('in viewWorkoutSaga');
    try {
        const viewWorkoutResponse = yield call(axios.get, '/api/workout')
        yield put({
            type: 'SET_WORKOUT_LIST',
            payload: viewWorkoutResponse.data
    })
    } catch (error) {
        console.log('error in viewWorkoutSaga', error); 
         //TODO: add alert box
    }
}

function* viewWorkoutSaga() {
    yield takeEvery('GET_WORKOUT', viewWorkout)
}
export default viewWorkoutSaga