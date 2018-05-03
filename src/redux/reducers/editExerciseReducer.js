const editExerciseList = (state= [], action) => {
    console.log(action.payload);
    
    switch (action.type) {
        case 'GET_SINGLE_EXERCISE_DETAILS':
            return action.payload;
        default:
            return state
    }
}

export default editExerciseList;


