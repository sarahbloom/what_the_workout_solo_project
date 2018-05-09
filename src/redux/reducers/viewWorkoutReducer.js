// Reducer to get workout detail array 
const viewWorkoutList = (state = [], action) => {    
    switch (action.type){
        case 'SET_WORKOUT_LIST':
            return action.payload;
        default:
            return state;
    }
}



export default viewWorkoutList;