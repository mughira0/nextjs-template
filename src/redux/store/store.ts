import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import authReducer from "../slices/auth";
import commonReducer from "../slices/common";

import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

// ==================
// Root Reducer
// ==================
const rootReducer = combineReducers({
  authReducer,
  commonReducer,
});

// ==================
// Persist Config
// ==================
const persistConfig: import("redux-persist").PersistConfig<
  ReturnType<typeof rootReducer>
> = {
  key: "root",
  storage,
  whitelist: ["authReducer"],
};

// ==================
// Persisted Reducer
// ==================
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ==================
// Store
// ==================
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

// ==================
// Types
// ==================
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ==================
// Persistor
// ==================
export const persistor = persistStore(store);

// Optional helper for dispatch outside react
export const dispatchFromStore: AppDispatch = store.dispatch;
