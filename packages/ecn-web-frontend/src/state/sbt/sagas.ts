import { delay, takeLeading, put, call } from "typed-redux-saga/macro";

import { sagaActions, actions as sbtActions } from ".";
import { fetchSbtItemByContractId } from "./fetchSbtItemByContractId.saga";

// function* fetchGalleryIfNotAndSBTLevels({
//   address,
//   id,
// }: {
//   address: string | undefined;
//   id: number;
// }) {
//   yield* call(fetchGalleryIfNot, {
//     address,
//   });
//   const [sbt] = yield* select((state) =>
//     sbtSelectors.selectSBTLevels(state, id)
//   );
//   if (sbt) {
//     yield* put(
//       sbtActions.update({
//         sbtLevel: sbt.SBTLevel,
//         chainId: sbt.chainId,
//         status: sbt.status,
//         artworks: sbt.artworks,
//         itemTexts: sbt.itemText,
//         detailTags: sbt.detailTags,
//       })
//     );
//   }
// }

// export function* fetchSbtItemByContractId(payload: {
//   ethAddress: string | undefined;
//   id: number;
//   chainId: number | undefined;
// }) {
//   const token = yield* select((state) =>
//     globalSelectors.selectAccessToken(state, {
//       address: payload.ethAddress,
//       chainId: payload.chainId,
//     })
//   );

//   try {
//     yield* fork(fetchGalleryIfNotAndSBTLevels, {
//       address: payload.ethAddress,
//       id: payload.id,
//     });
//   } catch (e) {
//     return {
//       success: false,
//       data: null,
//       error: Error("failed to get gallery items"),
//     };
//   }

//   const { ethAddress, id } = payload;
//   // console.log("token", token);
//   if (!token || !ethAddress) {
//     //
//     // return null;
//     return {
//       success: false,
//       data: null,
//       error: Error("not logged in yet"),
//     };
//   }
//   try {
//     const res = yield* call(ecnApiClient.sbtByContractId, {
//       token,
//       data: {
//         ethAddress,
//         id,
//       },
//     });

//     if (res.success) {
//       const { expressCount, records } = res;
//       return {
//         success: true,
//         data: { expressCount, records },
//         error: null,
//       };
//     }
//     return {
//       success: false,
//       data: null,
//       error: Error("failed to get sbt details from api"),
//     };
//   } catch (e) {
//     return {
//       success: false,
//       data: null,
//       error: Error("failed to get sbt details"),
//     };
//   }
// }
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
