import { PayloadAction } from "@reduxjs/toolkit";
import { call, delay, put, takeEvery, takeLatest } from "redux-saga/effects";
import { sagaActions, actions as persistDummyActions } from "./index";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* setProcess(action: PayloadAction<string>) {
  try {
    yield delay(2000);
    yield put({
      type: persistDummyActions.setPersistDummy,
      payload: action.payload,
    });
    yield delay(2000);
    yield put({
      type: persistDummyActions.setPersistDummy,
      payload: "ended",
    });
  } catch (e) {}
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
const persistDummySagas = [
  takeLatest(sagaActions.setProcess, setProcess),
  //
];

export { persistDummySagas };
