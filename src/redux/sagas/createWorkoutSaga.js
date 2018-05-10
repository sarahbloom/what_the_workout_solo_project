import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//get all exercises in the database
function* createWorkout (action){
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

//post a new workout (with associated exercises) to the database
function* postNewWorkout(action){
    try {
        const createNewWorkout = yield call(axios.post, '/api/exercise/newworkout', action.payload);
        // console.log('createNewWorkout', createNewWorkout);
        
        yield put({
            type: 'DISPLAY_WORKOUT_DETAIL',
            payload: createNewWorkout.data.id
        })
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