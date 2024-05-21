import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import Reducer from "./reducers";

const makeStore = () => configureStore({ reducer: Reducer });

export const wrapper = createWrapper(makeStore);

export default wrapper;
