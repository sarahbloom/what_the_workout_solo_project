const editSingleExerciseList = (state= [], action) => { 
    switch (action.type) {
        case 'GET_SINGLE_EXERCISE_DETAIL':
            return action.payload;
        default:
            return state
    }
}

export default editSingleExerciseList;


