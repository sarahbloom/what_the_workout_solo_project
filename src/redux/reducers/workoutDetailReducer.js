const workoutDetailList = (state = [], action) => {
    // console.log('workoutDetailList', action);
    
    switch (action.type) {
        case 'SET_WORKOUT_DETAILS':
            return action.payload;
        default:
            return state;
    }
}     

export default workoutDetailList;