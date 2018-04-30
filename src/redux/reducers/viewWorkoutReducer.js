// Reducer to get workout array into viewWorkoutList

const viewWorkoutList = (state = [], action) =>{
    switch (action.type){
        case 'SET_WORKOUT_LIST':
        return action.payload;
        default:
        return state;
    }
}

export default viewWorkoutList;