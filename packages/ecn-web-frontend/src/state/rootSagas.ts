import { all } from "typed-redux-saga/macro";

import { gallerySagas } from "./gallery/sagas";

export default function* sagas() {
  yield* all([
    //
    ...gallerySagas,
  ]);
}
