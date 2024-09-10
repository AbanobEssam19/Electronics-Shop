import Image from "next/image";
import styles from "./page.module.css";

import Nav from "./components/Nav/nav";

export default function Home() {
  return (
    <div className={styles.mainPage}>
      <Nav />
    </div>
  );
}