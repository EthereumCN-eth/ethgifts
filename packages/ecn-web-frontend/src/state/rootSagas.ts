import { all } from "typed-redux-saga/macro";

import { gallerySagas } from "./gallery/sagas";
import { nftSagas } from "./nft/sagas";
import { sbtSagas } from "./sbt/sagas";

export default function* sagas() {
  yield* all([
    //
    ...gallerySagas,
    ...sbtSagas,
    ...nftSagas,
  ]);
}
