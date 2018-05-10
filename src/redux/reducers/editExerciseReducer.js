//get the default sets, reps, and weights for a single exercise
const editSingleExerciseList = (state= [], action) => { 
    switch (action.type) {
        case 'GET_SINGLE_EXERCISE_DETAIL':
            return action.payload[0];
        default:
            return state
    }
}

export default editSingleExerciseList;


