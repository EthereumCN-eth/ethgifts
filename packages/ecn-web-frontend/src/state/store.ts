import {
  StoreEnhancer,
  ThunkAction,
  Action,
  configureStore,
  Middleware,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import sagas from "./rootSagas";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { reducer } from "./reducer";
import logger from "redux-logger";

const PERSISTED_KEYS: string[] = ["persistDummy", "global"];

const persistConfig = {
  key: "root",
  whitelist: PERSISTED_KEYS,
  version: 0,
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
