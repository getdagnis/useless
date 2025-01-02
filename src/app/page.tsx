import React from "react";
import { Header } from "../layout";
import { Slider } from "../components";
import styles from "./page.module.sass";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <Slider />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Page;
