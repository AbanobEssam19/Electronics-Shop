'use client'
import Image from "next/image";
import styles from "./page.module.css";

import Nav from "./components/Nav/nav";

import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
      if (typeof window !== 'undefined') {
        import('bootstrap/dist/js/bootstrap.bundle.min.js');
      }
  }, []);
  
  return (
    <div className={styles.mainPage}>
      <Nav />
    </div>
  );
}