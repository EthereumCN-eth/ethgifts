import { combineReducers } from "@reduxjs/toolkit";
import dummy from "./dummy/index";
import persistDummy from "./persistDummy/index";

const reducer = combineReducers({
  //
  dummy,
  persistDummy,
});

export { reducer };
