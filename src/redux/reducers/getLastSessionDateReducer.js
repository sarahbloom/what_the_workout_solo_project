//Get the last session date for a completed workout
const defaultState = {
    name: "",
    date: ""
}

const viewLastSessionDate = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_LAST_SESSION_DATE':
            return action.payload[0];
        default:
            return state;
    }
}

export default viewLastSessionDate;