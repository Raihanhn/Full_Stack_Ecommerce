import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage for web
import cartReducer from "./cartSlice";

// Combine reducers (in case you add more later)
const rootReducer = combineReducers({
  cart: cartReducer,
});

// Config for persistence
const persistConfig = {
  key: "root",
  storage,
};

// Wrap root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
});

// Create persistor
export const persistor = persistStore(store);
