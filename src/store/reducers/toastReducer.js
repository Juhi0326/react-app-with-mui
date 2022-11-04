const toastReducer = (state = false, action) => {
    if (action.type === 'TOAST_SHOW') {
        return {state: true, payload: action.payload, textType: action.textType };
    } else {
        return  {state: false, payload: '', textType: '' };
    }
}

export default toastReducer;