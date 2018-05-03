

const createWorkoutExerciseList = (state= [], action) => {
    switch (action.type) {
        case 'SET_EXERCISE_LIST':
            return action.payload;
        // case 'FETCH_START_WORKOUT':
        //     return action.payload;
        default:
            return state
    }
}

export default createWorkoutExerciseList;
