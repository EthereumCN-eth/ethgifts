import { delay, takeLeading, put, call } from "typed-redux-saga/macro";

import { sagaActions, actions as poapActions } from ".";
import { fetchPoapItemByContractId } from "./fetchPoapItemByContractId.saga";

function* fetchPoapDetails({
  payload,
}: ReturnType<typeof sagaActions.fetchPoapDetails>) {
  yield* put(poapActions.update({ loaded: false }));
  const { success, data } = yield* call(fetchPoapItemByContractId, payload);

  if (success && data) {
    yield* put(
      poapActions.update({
        loaded: true,
        ...data,
      })
    );
  } else {
    yield* put(
      poapActions.update({
        loaded: true,
      })
    );
  }

  yield* delay(3000);
}

const poapSagas = [
  takeLeading(sagaActions.fetchPoapDetails, fetchPoapDetails),

  //
];

export { poapSagas };
