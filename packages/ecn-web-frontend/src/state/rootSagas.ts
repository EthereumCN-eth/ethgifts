import { all } from "redux-saga/effects";

import { persistDummySagas } from "./persistDummy/sagas";

export default function* sagas() {
  yield all([
    //
    // ...loginSaga,
    ...persistDummySagas,
  ]);
}
