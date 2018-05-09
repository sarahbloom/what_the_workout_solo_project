// Reducer to get last session date 
const viewLastSessionDate = (state = [], action) => {
    switch (action.type) {
        case 'SET_LAST_SESSION_DATE':
            return action.payload;
        default:
            return state;
    }
}

export default viewLastSessionDate;