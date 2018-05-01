// "GET_WORKOUT"

import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* createWorkout (action){
    console.log('in createWorkoutSaga');
    try {
        const createWorkoutResponse = yield call(axios.get, '/api/exercise') 
        yield put({
            type: 'SET_EXERCISE_LIST',
            payload: createWorkoutResponse.data
        })
    } catch (error) {
        console.log('error in createWorkoutSaga', error);
         //TODO: add alert box
    }

}//end createWorkout

function* createWorkoutSaga(){
    yield takeEvery('GET_WORKOUT', createWorkout)
}

export default createWorkoutSaga;