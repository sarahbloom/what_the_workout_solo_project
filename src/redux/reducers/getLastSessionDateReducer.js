// Reducer to get last session date 
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