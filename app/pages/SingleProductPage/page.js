'use client'
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "@/app/components/Nav/nav";
import Carousel from "../../components/Carousel/carousel";
import styles from "./page.module.css";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { library } from "@fortawesome/fontawesome-svg-core";

import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import Card from "@/app/components/Card/card";
import Footer from "@/app/components/Footer/footer";

library.add(fab, fas, far);

import { useState, useRef } from "react";

export default function Main() {

  const amountRef = useRef();

  function increaseAmount() {
    amountRef.current.value = parseInt(amountRef.current.value) + 1;
  }

  function decreaseAmount() {
    if (amountRef.current.value > 1)
      amountRef.current.value = amountRef.current.value - 1;
  }

  return (
    <>
      <Nav />
      <div className={`container ${styles.main}`}>
        <div className={styles.product}>
          <Carousel />
          <div className={styles.productDetails}>
            <h3 className={styles.title}>AC Light Dimmer SCR (220V-2000W) and AC Motor Speed Controller Module</h3>
            <div className={styles.state}>
              <FontAwesomeIcon icon="fa-regular fa-circle-check" />
              <p>In Stock</p>
            </div>
            <div className={styles.price}>
              <p>100.00 EGP</p>
              <del>135.00 EGP</del>
            </div>
            <div className={styles.buttonsBox}>
              <div className={styles.amountContainer}>
                <button onClick={decreaseAmount}>-</button>
                <input type="number" value={1} ref={amountRef} />
                <button onClick={increaseAmount}>+</button>
              </div>
              <button>Add to cart</button>
              <button>
                <FontAwesomeIcon icon="fa-regular fa-heart" />
                <p>Add to wishlist</p>
              </button>
            </div>
            <div className={styles.cartAmount}>
              
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
