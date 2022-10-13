import { combineReducers } from "@reduxjs/toolkit";

import gallery from "./gallery";
import global from "./global/index";
import sbt from "./sbt";

const reducer = combineReducers({
  //
  gallery,
  global,
  sbt,
});

export { reducer };
