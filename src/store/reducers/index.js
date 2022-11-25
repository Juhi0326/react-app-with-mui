
import toastReducer from './toastReducer';
import userReducer from './userReducer';
import cartReducer from './cartReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers( {
    toast: toastReducer,
    user: userReducer,
    cart: cartReducer
});

export default allReducers;