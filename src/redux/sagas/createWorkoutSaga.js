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
        yield put({
            type: 'DISPLAY_CREATED_WORKOUT_DETAIL',
            payload: createNewWorkout.data.id
        })
        console.log('createNewWorkout', createNewWorkout);
    } catch (error) {
        console.log('error in POST new workout', error);
        //TODO: add alert box
    }
}

function* viewNewWorkout(action) {
    try {
        const newWorkoutDetailResponse = yield call(axios.get, `/api/workout/detail/${action.payload}`)
        yield put({
            type: 'SET_WORKOUT_DETAILS',
            payload: newWorkoutDetailResponse.data
        })
        console.log('newWorkoutDetailResponse', newWorkoutDetailResponse);
        
    } catch (error) {
        console.log('error in workoutDetail saga', error);
        //TODO: add alert box
    }
}

function* createWorkoutSaga(){
    yield takeEvery('GET_EXERCISE', createWorkout)
    yield takeEvery('POST_NEW_WORKOUT', postNewWorkout)
    yield takeEvery('DISPLAY_CREATED_WORKOUT_DETAIL', viewNewWorkout)
}

export default createWorkoutSaga;