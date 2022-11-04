const userReducer = (state = false, action) => {
    if (action.type === 'SIGN_IN') {
        return {state: true, payload: action.payload };
    } else if (action.type === 'SIGN_OUT'){
        return {state: false, user: null};
    } else {
        return state
    }

}

export default userReducer;