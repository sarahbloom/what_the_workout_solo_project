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
}


function* postNewWorkout(action){
    // console.log('in saveWorkoutToDatabase sagas', action);
    try {
        yield call(axios.post, '/api/exercise/newworkout', action.payload);
    } catch (error) {
        console.log('error in POST new workout', error);
        //TODO: add alert box
    }
}

function* createWorkoutSaga(){
    yield takeEvery('GET_EXERCISE', createWorkout)
    yield takeEvery('POST_NEW_WORKOUT', postNewWorkout)
}

export default createWorkoutSaga;