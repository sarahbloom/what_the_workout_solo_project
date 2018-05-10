const editSingleExerciseList = (state= [], action) => { 
    // console.log('single exercise', action.payload);
    switch (action.type) {
        case 'GET_SINGLE_EXERCISE_DETAIL':
            return action.payload[0];
        default:
            return state
    }
}

export default editSingleExerciseList;


