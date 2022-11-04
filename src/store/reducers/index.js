
import toastReducer from './toastReducer';
import userReducer from './userReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers( {
    toast: toastReducer,
    user: userReducer,
});

export default allReducers;