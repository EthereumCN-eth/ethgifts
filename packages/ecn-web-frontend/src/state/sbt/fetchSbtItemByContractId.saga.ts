import { call, select } from "typed-redux-saga/macro";

import { fetchGalleryIfNot } from "../gallery/sagas";
import { ecnApiClient } from "@/apis";
import { selectors as globalSelectors } from "@/state/global/index";

export function* fetchSbtItemByContractId(payload: {
  ethAddress: string;
  id: number;
}) {
  const token = yield* select(globalSelectors.selectAccessToken);

  try {
    yield* call(fetchGalleryIfNot, {
      address: payload.ethAddress,
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
