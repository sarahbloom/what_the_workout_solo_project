import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* editSingleExercise (action){
    console.log('editSingleExercise', action.payload);
//     try {
//         let exerciseUpdate = yield call(axios.put, `/api/exercise/${action.payload.id}`, action.payload)
//         // yield put ({
//         //     type: 'GET_SINGLE_EXERCISE_DETAILS',
//         //     response: exerciseUpdate.data
//         // })
//     } catch (error) {
//         console.log('error in editSingleExercise Saga', error);
//         //TODO: add alert box
//     }
}

function* viewSingleExercise (action){
    console.log('viewSingleExercise', action.payload);
    try {
        let viewExercise = yield call (axios.get, `/api/exercise/${action.payload.id}`)
        yield put({
            type: 'GET_SINGLE_EXERCISE_DETAILS',
            payload: viewExercise.data
        })
    } catch (error) {
        console.log('error in viewSingleExercise Saga', error);
//         //TODO: add alert box
    }
}

function* editExerciseSaga() {
    yield takeEvery('UPDATE_SINGLE_EXERCISE', editSingleExercise)
    yield takeEvery('VIEW_SINGLE_EXERCISE', viewSingleExercise)
}

export default editExerciseSaga;