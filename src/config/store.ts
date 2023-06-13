import {createStore, combineReducers} from 'redux';
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import authReducer from '../redux/auth.reducer';

const persistConfig = {
    key: "root",
    version: 2,
    storage
}

const reducerList = combineReducers({
    auth: authReducer
})

const persistedReducer = persistReducer(persistConfig, reducerList)
const store = createStore(persistedReducer)

export default store