import { delay, takeLeading, put, call } from "typed-redux-saga/macro";

import { sagaActions, actions as nftActions } from ".";
import { fetchNFTItemByContractId } from "./fetchNFTItemByContractId.saga";

function* fetchNFTDetails({
  payload,
}: ReturnType<typeof sagaActions.fetchNFTDetails>) {
  yield* put(nftActions.update({ loaded: false }));
  const { success, data } = yield* call(fetchNFTItemByContractId, payload);

  if (success && data) {
    yield* put(
      nftActions.update({
        loaded: true,
        ...data,
      })
    );
  } else {
    yield* put(
      nftActions.update({
        loaded: true,
      })
    );
  }

  yield* delay(3000);
}

const nftSagas = [
  takeLeading(sagaActions.fetchNFTDetails, fetchNFTDetails),

  //
];

export { nftSagas };
