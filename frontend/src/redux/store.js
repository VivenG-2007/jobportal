import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import companySlice from "./companySlice";
import applicationSlice from "./applicationSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

const storage = {
    getItem(key) {
        return Promise.resolve(localStorage.getItem(key));
    },
    setItem(key, value) {
        return Promise.resolve(localStorage.setItem(key, value));
    },
    removeItem(key) {
        return Promise.resolve(localStorage.removeItem(key));
    },
};

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({
    auth: authSlice,
    job: jobSlice,
    company: companySlice,
    application: applicationSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store)
export default store;
