import { combineReducers } from "@reduxjs/toolkit";

import gallery from "./gallery";
import global from "./global/index";
import nft from "./nft";
import poap from "./poap";
import sbt from "./sbt";

const reducer = combineReducers({
  //
  gallery,
  global,
  sbt,
  nft,
  poap,
});

export { reducer };
