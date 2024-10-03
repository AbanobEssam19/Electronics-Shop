import styles from "./card.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Link from "next/link";

import { useState, useRef, useEffect } from "react";

export default function Card({ product, setCurrentProduct }) {

  const [productID, setProductID] = useState(null);

  if (!product) {
    return <div>Loading...</div>;  // Fallback in case product is still undefined
  }


  const amountRef = useRef();

  function increaseAmount() {
    amountRef.current.value = parseInt(amountRef.current.value) + 1;
  }

  function decreaseAmount() {
    if (amountRef.current.value > 1)
      amountRef.current.value = amountRef.current.value - 1;
  }

  return (
    <div className={`${styles.wholeCard}`}>
      <div className={styles.cardImg}>
        <Link href="/pages/product">
          <img src={product.photo[0]} />
          <div className={styles.discount} style={product.discount != 0 ? {} : {display: "none"}}>{product.discount}%</div>
        </Link>
        <Link href="/" className={styles.wish}>
          <div className={styles.wishList}>
            <FontAwesomeIcon
              icon="fa-regular fa-heart"
              style={{ width: "35px", height: "14px", color: "black" }}
            />
          </div>
        </Link>
        {/* <!-- Button trigger modal --> */}
        <button
          type="button"
          className={`btn btn-light ${styles.eye}`}
          data-bs-toggle="modal"
          data-bs-target="#modalProduct"
          onClick={() => {setCurrentProduct(product)}}
        >
          <FontAwesomeIcon
            icon="fa-regular fa-eye"
            style={{ width: "35px", height: "14px", color: "black" }}
          />
        </button>

      </div>
      <Link href="/" className={styles.anchor}>
        <h3 className={styles.title}>{product.name}</h3>
      </Link>
      <div className={styles.lowerPart}>
        <div className={styles.price}>
          <span style={product.discount != 0 ? {} : {display: "none"}}>{Math.floor((product.price / (100 - product.discount)) * 100)}.00EGP</span>
          <p>
            {product.price}.00EGP
          </p>
        </div>
        <button className={styles.shoppingCart}>
          <FontAwesomeIcon
            icon="fa-solid fa-cart-shopping"
            style={{
              width: "30px",
              height: "14px",
              color: "black",
              marginTop: "5px",
            }}
          />
        </button>
      </div>
    </div>
  );
}