import { combineReducers } from "@reduxjs/toolkit";
import dummy from "./dummy/index";
import persistDummy from "./persistDummy/index";
import global from "./global/index";

const reducer = combineReducers({
  //
  dummy,
  persistDummy,
  global,
});

export { reducer };
