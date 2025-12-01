"use client";

import { persistStore } from "redux-persist";
import { store } from "./store";

// Persistor instance
export const persistor = persistStore(store);
