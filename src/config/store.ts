import {createStore, combineReducers} from 'redux';
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import balanceReducer from './balanceReducer';
import myProductReducer from './myProductReducer';
import transactionIdReducer from './transactionIdReducer';

const persistConfig = {
    key: "root",
    version: 1,
    storage
}

const reducerList = combineReducers({
    balance: balanceReducer,
    myProduct: myProductReducer,
    transactionId: transactionIdReducer
})

const persistedReducer = persistReducer(persistConfig, reducerList)
const store = createStore(persistedReducer)

export default store