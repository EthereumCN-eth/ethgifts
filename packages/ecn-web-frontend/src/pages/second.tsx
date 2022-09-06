import { css } from "@emotion/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { MediaQueryKey } from "../styles/media";
import { useAppSelector, useAppDispatch } from "src/state/reduxHooks";
import {
  selectors as persistDummySelector,
  actions as persistDummyActions,
  sagaActions as persistDummySagaActions,
} from "src/state/persistDummy";
import Link from "next/link";
import { ChangeEvent } from "react";

const Second: NextPage = () => {
  const persistData = useAppSelector(
    persistDummySelector.selectPersistDummyData
  );
  const dispatch = useAppDispatch();
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(persistDummySagaActions.setProcess(e.target.value));
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
        {persistData}
      </span>
      <br />
      <input type={"text"} onChange={onChangeInput}></input>
      <br />
      <Link href="/">
        <a> to home</a>
      </Link>
    </div>
  );
};

export default Second;
