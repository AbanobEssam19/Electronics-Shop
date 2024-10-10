"use client";
import Carousel from "../../components/Carousel/carousel";
import styles from "./page.module.css";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Card from "@/app/components/Card/card";

import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

export default function Main() {

  const productId = useSearchParams().get("id");

  const products = useSelector((state) => state.productsData.data);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (products) {
      const foundProduct = products.find((product) => product._id == productId);
      setProduct(foundProduct);
    }
  }, [productId]);

  const [amount, setAmount] = useState(1);
  const amountRef = useRef();

  function increaseAmount() {
    amountRef.current.value = parseInt(amountRef.current.value) + 1;
  }

  function decreaseAmount() {
    if (amountRef.current.value > 1)
      amountRef.current.value = amountRef.current.value - 1;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={`container ${styles.main}`}>
        <div className={styles.product}>
          <Carousel />
          <div className={styles.productDetails}>
            <h3 className={styles.title}>
              {product.name}
            </h3>
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
                <input
                  type="number"
                  value={amount}
                  ref={amountRef}
                  onChange={(e) => {
                    if (e.target.value === "") e.target.value = 1;
                    setAmount(e.target.value);
                  }}
                />
                <button onClick={increaseAmount}>+</button>
              </div>
              <button>Add to cart</button>
              <button>
                <FontAwesomeIcon icon="fa-regular fa-heart" />
                <p>Add to wishlist</p>
              </button>
            </div>
            <div className={styles.cartAmount}>
              <FontAwesomeIcon icon="fa-solid fa-bag-shopping" />
              <p>
                <strong>Other people want this</strong>, x people have this in
                their carts right now.
              </p>
            </div>
            <div className={styles.categories}>
              <p style={{ display: "inline" }}>categories: </p>
              <Link href="/">categories</Link>
              <Link href="/">, categories</Link>
              <Link href="/">, categories</Link>
              <Link href="/">, categories</Link>
              <Link href="/">, categories</Link>
              <Link href="/">, categories</Link>
              <Link href="/">, categories</Link>
            </div>
          </div>
        </div>
        <div className={styles.productDescription}>
          <h4>Description:</h4>
          <p>
            This is an easy-to-use voltage regulator to control light
            brightness, speed or temperature. The large power voltage regulator
            is equipped with two-way silicon controlled rectifier, which is very
            convenient and practical. The voltage regulator has a large power
            and can be used for large household or small industrial electrical
            appliances whose power is less than 2000W (power should be reduced
            for inductance or capacitance loads). This controller uses novel
            bi-directional high-power SCR. It can be very convenient adjust the
            current up to 25A, and solve the over current problem of the heating
            wire resistance is too small in the case of cooling causing good.
            The output voltage is adjusted anywhere between 50V-220V for use
            with electrical appliances. It can use to such as electric stove,
            water heater tune thermal, lighting dimmer, small motor speed,
            electric iron thermostat, and achieve dimming, thermostats, pressure
            regulator effect. <br />
            <br />
            Specifications: Input Voltage: AC220V (NOT 110V) Max Power: 2000W
            Output Voltage: AC 50V to 220V The maximum output current :25A The
            operation environment temperature:-20C-40C Size: 48 x 35 x 28 mm /
            1.89 x 1.37 x 1.1 in. Packaging includes: 1 x voltage regulator
            Note: The input voltage of this voltage regulator can NOT be 110V.
          </p>
        </div>
        <RelatedProducts />
      </div>
    </>
  );
}

function RelatedProducts() {
  const container = useRef();

  function slideLeft() {
    container.current.scrollBy({ left: -260, behavior: "smooth" });
  }

  function slideRight() {
    container.current.scrollBy({ left: 260, behavior: "smooth" });
  }

  return (
    <div className={`${styles.section}`}>
      <div className={styles.header}>
        <h4>Related Products </h4>
        <Link href="/">View All →</Link>
      </div>
      <div className={styles.content}>
        <button onClick={slideLeft}>&lt;</button>
        <div className={styles.cardContainer} ref={container}>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
        <button onClick={slideRight}>&gt;</button>
      </div>
    </div>
  );
}
