import { combineReducers } from "@reduxjs/toolkit";

import global from "./global/index";
import persistDummy from "./persistDummy/index";

const reducer = combineReducers({
  //

  persistDummy,
  global,
});

export { reducer };
