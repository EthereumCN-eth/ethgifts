import {
  call,
  delay,
  put,
  select,
  takeLeading,
  fork,
} from "typed-redux-saga/macro";

import { ecnApiClient } from "@/apis";
import {
  selectors as gallerySelectors,
  sagaActions,
  actions as galleryActions,
} from "@/state/gallery/index";

import { convertGalleryItem } from "./helper";

function* fetchPoapEventsApi(address: string) {
  try {
    yield* put({
      type: galleryActions.update,
      payload: { poapStatusLoading: true },
    });
    const result = yield* call(ecnApiClient.getAllPoapEventByAddress, {
      address,
    });
    if (result.success) {
      yield* put({
        type: galleryActions.update,
        payload: { poapStatusLoading: false, poapEvents: result.data },
      });
    } else {
      yield* put({
        type: galleryActions.update,
        payload: { poapStatusLoading: false },
      });
    }
  } catch (e) {
    yield* put({
      type: galleryActions.update,
      payload: { poapStatusLoading: false },
    });
    //
  }
}

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchGalleryItems({
  payload: { address },
}: ReturnType<typeof sagaActions.fetchGalleryItems>) {
  try {
    if (address) yield* fork(fetchPoapEventsApi, address);
    yield* put({
      type: galleryActions.update,
      payload: { loading: true },
    });
    const items = yield* call(ecnApiClient.gallery, { data: {} });
    yield* put({
      type: galleryActions.setGalleryItems,
      payload: convertGalleryItem(items.items, address),
    });
    yield* put({
      type: galleryActions.update,
      payload: { loading: false },
    });

    // yield delay(2000);
  } catch (e) {
    yield* put({
      type: galleryActions.update,
      payload: { loading: false },
    });
  }
  yield* delay(3000);
}

export function* fetchGalleryIfNot({
  address,
}: {
  address: string | undefined;
}) {
  const items = yield* select(gallerySelectors.selectGalleryItems);
  if (items.length === 0) {
    yield* call(fetchGalleryItems, { type: "_", payload: { address } });
  }
}

function* fetchNFTItemByContractId({
  payload,
}: ReturnType<typeof sagaActions.fetchNFTItemByContractId>) {
  yield* call(fetchGalleryIfNot, {
    address: payload.ethAddress,
  });
  yield* delay(3000);
}

// eslint-disable-next-line sonarjs/no-identical-functions
function* fetchPoapItemByContractId({
  payload,
}: ReturnType<typeof sagaActions.fetchPoapItemByContractId>) {
  yield* call(fetchGalleryIfNot, {
    address: payload.ethAddress,
  });
  yield* delay(3000);
}

const gallerySagas = [
  takeLeading(sagaActions.fetchGalleryItems, fetchGalleryItems),
  takeLeading(sagaActions.fetchNFTItemByContractId, fetchNFTItemByContractId),
  takeLeading(sagaActions.fetchPoapItemByContractId, fetchPoapItemByContractId),
  //
];

export { gallerySagas };
