import {combineReducers, configureStore} from '@reduxjs/toolkit';
import storage from "redux-persist/lib/storage";
import {
    persistStore,
    persistReducer,
} from "redux-persist";
import {itemsReducer} from "./reducers/item_reducer/itemsReducer";

export const rootReducer = combineReducers({itemsReducer});

const persistConfig = {
    key: "root",
    storage,
    blacklist: []
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const createReduxStore = (initialState = {}) => {
    return configureStore({
        reducer: persistedReducer,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false
            }),
    });
};
export const persistCreator = persistStore;

