import styles from './page.module.css';
import { Header, Slider } from '../components/';

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
