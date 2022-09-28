import { call, delay, put, takeLatest } from "typed-redux-saga/macro";

import { ecnApiClient } from "@/apis";

import { convertGalleryItem } from "./helpers";
import { sagaActions, actions as galleryActions } from "./index";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchGalleryItems() {
  try {
    yield* delay(2000);
    const items = yield* call(ecnApiClient.gallery, { data: {} });
    yield* put({
      type: galleryActions.setGalleryItems,
      payload: convertGalleryItem(items.items),
    });

    // yield delay(2000);

    // eslint-disable-next-line no-empty
  } catch (e) {}
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
const gallerySagas = [
  takeLatest(sagaActions.fetchGalleryItems, fetchGalleryItems),
  //
];

export { gallerySagas };
