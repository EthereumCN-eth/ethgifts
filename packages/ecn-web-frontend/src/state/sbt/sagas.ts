import {
  delay,
  takeLeading,
  put,
  call,
  select,
  fork,
} from "typed-redux-saga/macro";

import { fetchGalleryIfNot } from "../gallery/sagas";
import { ecnApiClient } from "@/apis";
import { selectors as globalSelectors } from "@/state/global/index";

import {
  sagaActions,
  actions as sbtActions,
  selectors as sbtSelectors,
} from ".";

function* fetchGalleryIfNotAndSBTLevels({
  address,
  id,
}: {
  address: string;
  id: number;
}) {
  yield* call(fetchGalleryIfNot, {
    address,
  });
  const [sbt] = yield* select((state) =>
    sbtSelectors.selectSBTLevels(state, id)
  );
  if (sbt) {
    yield* put(
      sbtActions.update({
        SBTLevel: sbt.SBTLevel,
        chainId: sbt.chainId,
        status: sbt.status,
      })
    );
  }
}

export function* fetchSbtItemByContractId(payload: {
  ethAddress: string;
  id: number;
}) {
  const token = yield* select(globalSelectors.selectAccessToken);

  try {
    yield* fork(fetchGalleryIfNotAndSBTLevels, {
      address: payload.ethAddress,
      id: payload.id,
    });
  } catch (e) {
    return {
      success: false,
      data: null,
      error: Error("failed to get gallery items"),
    };
  }

  // console.log("token", token);
  if (!token) {
    //
    // return null;
    return {
      success: false,
      data: null,
      error: Error("not logged in yet"),
    };
  }
  try {
    const res = yield* call(ecnApiClient.sbtByContractId, {
      token,
      data: payload,
    });

    if (res.success) {
      const { expressCount, records } = res;
      return {
        success: true,
        data: { expressCount, records },
        error: null,
      };
    }
    return {
      success: false,
      data: null,
      error: Error("failed to get sbt details from api"),
    };
  } catch (e) {
    return {
      success: false,
      data: null,
      error: Error("failed to get sbt details"),
    };
  }
}
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
