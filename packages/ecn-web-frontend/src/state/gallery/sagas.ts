import { call, delay, put, select, takeLeading } from "typed-redux-saga/macro";

import { ecnApiClient } from "@/apis";
import { selectors as globalSelectors } from "@/state/global/index";

import { convertGalleryItem } from "./helpers";
import { sagaActions, actions as galleryActions } from "./index";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchGalleryItems() {
  try {
    yield* put({
      type: galleryActions.update,
      payload: { loading: true },
    });
    const items = yield* call(ecnApiClient.gallery, { data: {} });
    yield* put({
      type: galleryActions.setGalleryItems,
      payload: convertGalleryItem(items.items),
    });
    yield* put({
      type: galleryActions.update,
      payload: { loading: false },
    });

    // yield delay(2000);

    // eslint-disable-next-line no-empty
  } catch (e) {
    yield* put({
      type: galleryActions.update,
      payload: { loading: true },
    });
  }
  yield* delay(3000);
}

function* fetchSbtItemByContractId({
  payload,
}: ReturnType<typeof sagaActions.fetchSbtItemByContractId>) {
  const token = yield* select(globalSelectors.selectAccessToken);
  // console.log("token", token);
  if (!token) {
    //
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const res = yield* call(ecnApiClient.sbtByContractId, {
      token,
      data: payload,
    });
    // console.log("res", res);
  }
  yield* delay(3000);
}

const gallerySagas = [
  takeLeading(sagaActions.fetchGalleryItems, fetchGalleryItems),
  takeLeading(sagaActions.fetchSbtItemByContractId, fetchSbtItemByContractId),
  //
];

export { gallerySagas };
