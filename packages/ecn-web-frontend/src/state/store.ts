import type { Middleware } from "@reduxjs/toolkit";
import {
  // StoreEnhancer,
  // ThunkAction,
  // Action,
  configureStore,
} from "@reduxjs/toolkit";
import logger from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";

import { reducer } from "./reducer";
import sagas from "./rootSagas";

const PERSISTED_KEYS: string[] = ["global"];

const persistConfig = {
  key: "root",
  whitelist: PERSISTED_KEYS,
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export function configureAppStore() {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

  const middlewares: Middleware[] = [];
  middlewares.push(sagaMiddleware);
  if (process.env.NODE_ENV !== "production") {
    middlewares.push(logger);
  }
  // Create the store with saga middleware

  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: false,
        serializableCheck: false,
        immutableCheck: true,
      }).concat(middlewares),
    devTools: process.env.NODE_ENV !== "production",
  });
  sagaMiddleware.run.call(store, sagas);

  return store;
}

const store = configureAppStore();

export const persistor = persistStore(store);

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
