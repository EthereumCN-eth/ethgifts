import { delay, takeLeading, put, call } from "typed-redux-saga/macro";

import { sagaActions, actions as sbtActions } from ".";
import { fetchSbtItemByContractId } from "./fetchSbtItemByContractId.saga";

function* fetchSBTDetails({
  payload,
}: ReturnType<typeof sagaActions.fetchSBTDetails>) {
  yield* put(sbtActions.update({ loaded: false }));
  const { success, data } = yield* call(fetchSbtItemByContractId, payload);

  if (success && data) {
    yield* put(
      sbtActions.update({
        loaded: true,
        expressCount: data.expressCount,
        records: data?.records,
      })
    );
  } else {
    yield* put(
      sbtActions.update({
        loaded: true,
        expressCount: data?.expressCount,
        records: data?.records,
      })
    );
  }

  yield* delay(3000);
}

const sbtSagas = [
  takeLeading(sagaActions.fetchSBTDetails, fetchSBTDetails),

  //
];

export { sbtSagas };
