// Reducer to get array of workout names and IDs 
const viewWorkoutList = (state = [], action) => {    
    // console.log('viewWorkoutList', action.payload);
    switch (action.type){
        case 'SET_WORKOUT_LIST':
            return action.payload;
        default:
            return state;
    }
}

export default viewWorkoutList;