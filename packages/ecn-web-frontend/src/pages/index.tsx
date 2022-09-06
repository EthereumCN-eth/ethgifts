import { css } from "@emotion/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { MediaQueryKey } from "../styles/media";
import { useAppSelector, useAppDispatch } from "src/state/reduxHooks";
import {
  selectors as dummySelector,
  actions as DummyActions,
} from "src/state/dummy";
import Link from "next/link";

const Home: NextPage = () => {
  const dummyData = useAppSelector(dummySelector.selectDummyData);
  const dispatch = useAppDispatch();
  const onChangeInput = (val: string) => {
    dispatch(DummyActions.setDummy(val));
  };
  return (
    <div
      css={(theme) => css`
        width: 100%;
        height: 100vh;
        background-color: ${theme.colors.white};
      `}
    >
      <h1>Home</h1>
      <span
        css={(theme) => css`
          color: ${theme.colors.black};
          ${theme.fontSize.std1}
        `}
      >
        {dummyData}
      </span>
      <br />
      <input
        type={"text"}
        onChange={(e) => {
          onChangeInput(e.target.value);
        }}
      ></input>
      <br />
      <Link href="/second">
        <a> to second</a>
      </Link>
    </div>
  );
};

export default Home;
