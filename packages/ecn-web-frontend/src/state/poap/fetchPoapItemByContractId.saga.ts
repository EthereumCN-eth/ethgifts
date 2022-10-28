import { call, put, select } from "typed-redux-saga/macro";

import { fetchGalleryIfNot } from "../gallery/sagas";
import { selectors as gallerySelectors } from "@/state/gallery/index";

import { actions as poapActions } from ".";

function* fetchGalleryIfNotAndPoap({
  address,
  id,
}: {
  address: string | undefined;
  id: number;
}) {
  try {
    yield* call(fetchGalleryIfNot, {
      address,
    });
    const item = yield* select((state) =>
      gallerySelectors.selectPoapById(state, id)
    );
    if (item) {
      yield* put(poapActions.update(item));
      return {
        success: true,
        data: item,
        error: Error("failed to get poap items"),
      };
    } else {
      return {
        success: false,
        data: null,
        error: Error("no nft item(specified id)"),
      };
    }
  } catch (e) {
    return {
      success: false,
      data: null,
      error: Error("failed to get gallery items"),
    };
  }
}

export function* fetchPoapItemByContractId({
  id,
  ethAddress,
}: {
  ethAddress: string | undefined;
  id: number;
  chainId: number | undefined;
}) {
  return yield* call(fetchGalleryIfNotAndPoap, {
    address: ethAddress,
    id,
  });
}
