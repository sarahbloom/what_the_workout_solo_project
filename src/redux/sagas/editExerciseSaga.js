import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//update the defaults sets, reps, or weights for an exercise
function* editExerciseDefault (action){
    // console.log('editSingleExercise', action);
    const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
    }
    try {
        let exerciseUpdate = yield call(axios.put, `/api/exercise/${action.payload.id}`, action.payload, config)
        yield put ({
            type: 'GET_SINGLE_EXERCISE_DETAILS',
            payload: exerciseUpdate.data
        })
    } catch (error) {
        console.log('error in editSingleExercise Saga', error);
        //TODO: add alert box
    }
}

//get the default information for a single exercise (displays in modal for updating)
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
    yield takeEvery('VIEW_SINGLE_EXERCISE', viewSingleExercise)
}

export default editExerciseSaga;