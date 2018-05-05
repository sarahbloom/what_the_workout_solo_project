const startSessionList = (state = [], action) => {
    switch (action.type) {
        case 'GET_CURRENT_SESSION_DETAIL':
            return action.payload;
        default:
            return state
    }
}

export default startSessionList;