import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
import allReducers from '../store/reducers/index'
 
const persistConfig = {
  key: 'root',
  storage,
}
 
const persistedReducer = persistReducer(
    persistConfig, 
    allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    )
 

const store = createStore(persistedReducer, applyMiddleware())
const Persistor = persistStore(store)

export default store
export {Persistor}

