//update the sets, reps, or weights for a completed exercise
//this is updated while the user is completing a workout

const startSessionList = (state = [], action) => {
    switch (action.type) {
        case 'GET_CURRENT_SESSION_DETAIL':
            return action.payload;
        default:
            return state
    }
}

export default startSessionList;