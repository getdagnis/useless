import styles from "./page.module.sass";
import { Header, Slider } from "../src/components/";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <Slider />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
