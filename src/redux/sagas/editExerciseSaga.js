import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* editExerciseDefault (action){
    console.log('editSingleExercise', action);
    const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
    }
    try {
        let exerciseUpdate = yield call(axios.put, `/api/exercise/${action.payload.id}`, action.payload)
        yield put ({
            type: 'GET_SINGLE_EXERCISE_DETAILS',
            payload: exerciseUpdate.data
        })
    } catch (error) {
        console.log('error in editSingleExercise Saga', error);
        //TODO: add alert box
    }
}

function* viewSingleExercise (action){
    try {
        let viewExercise = yield call (axios.get, `/api/exercise/${action.payload.id}`)
        console.log('viewExercise', viewExercise);
        
        yield put({
            type: 'GET_SINGLE_EXERCISE_DETAIL',
            payload: viewExercise.data
        })
    } catch (error) {
        console.log('error in viewSingleExercise Saga', error);
//         //TODO: add alert box
    }
}

function* editExerciseSaga() {
    yield takeEvery('UPDATE_DEFAULT', editExerciseDefault)
    // yield takeEvery('UPDATE_REPS', editReps)
    // yield takeEvery('UPDATE_WEIGHT', editWeight)
    yield takeEvery('VIEW_SINGLE_EXERCISE', viewSingleExercise)
}

export default editExerciseSaga;