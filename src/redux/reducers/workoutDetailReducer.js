//get exercises and defaults associated with the workout

const workoutDetailList = (state = [], action) => {
    switch (action.type) {
    case 'SET_WORKOUT_DETAILS':
        return action.payload;
    default:
        return state;
    }
}     

export default workoutDetailList
    
