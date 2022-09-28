import { combineReducers } from "@reduxjs/toolkit";

import gallery from "./gallery";
import global from "./global/index";

const reducer = combineReducers({
  //
  gallery,
  global,
});

export { reducer };
