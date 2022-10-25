import { call, put, select } from "typed-redux-saga/macro";

import { fetchGalleryIfNot } from "../gallery/sagas";
import { selectors as gallerySelectors } from "@/state/gallery/index";

import { actions as nftActions } from ".";

function* fetchGalleryIfNotAndNFT({
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
      gallerySelectors.selectNFTById(state, id)
    );
    if (item) {
      yield* put(nftActions.update(item));
      return {
        success: true,
        data: item,
        error: Error("failed to get nft items"),
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

export function* fetchNFTItemByContractId({
  id,
  ethAddress,
}: {
  ethAddress: string | undefined;
  id: number;
  chainId: number | undefined;
}) {
  return yield* call(fetchGalleryIfNotAndNFT, {
    address: ethAddress,
    id,
  });
}
