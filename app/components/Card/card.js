import styles from "./card.module.css";

import "bootstrap/dist/css/bootstrap.min.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { library } from "@fortawesome/fontawesome-svg-core";

import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

import Link from "next/link";

library.add(fab, fas, far);

import { useState, useRef } from "react";

export default function Card() {
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
          <img src="../card-1.jpg" />
          <div className={styles.discount}>26%</div>
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
          data-bs-target="#exampleModalCenter"
        >
          <FontAwesomeIcon
            icon="fa-regular fa-eye"
            style={{ width: "35px", height: "14px", color: "black" }}
          />
        </button>

        {/* <!-- Modal --> */}
        <div
          class="modal fade"
          id="exampleModalCenter"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div
            class="modal-dialog modal-dialog-centered modal-xl"
            role="document"
          >
            <div
              className={`modal-content ${styles.ModelContent}`}
            >
              <div
                class="modal-header border-0"
                style={{ position: "relative" }}
              >
                <h5 class="modal-title" id="exampleModalLongTitle"></h5>
                <button
                  type="button"
                  className={`col-1 close ${styles.closebtn}`}
                  style={{ width: "36px" }}
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className={`modal-body ${styles.ModelBody}`}>
                <div className={styles.LeftPart}>
                  <Link href="/">
                    <img src="../card-1.jpg" />
                  </Link>
                </div>
                <div className={styles.RightPart}>
                  <h1 className={styles.ProductText}>
                    AC Light Dimmer SCR (220V-2000W) and AC Motor Speed
                    Controller Module
                  </h1>
                  <div className={styles.state}>
                    <FontAwesomeIcon
                      icon="fa-regular fa-circle-check"
                      style={{ color: "#54ca87" }}
                    />
                    <p>In Stock</p>
                  </div>
                  <div className={styles.price}>
                    <p>EGP 100.00 </p>
                    <del>EGP 135.00 </del>
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
                    <FontAwesomeIcon icon="fa-solid fa-bag-shopping" />
                    <p>
                      <strong>Other people want this</strong>, x people have
                      this in their carts right now.
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
            </div>
          </div>
        </div>
      </div>
      <Link href="/" className={styles.anchor}>
        <h3 className={styles.title}>AC Light Dimmer SCR (220V-2000W) and</h3>
      </Link>
      <div className={styles.lowerPart}>
        <div className={styles.price}>
          <p>
            <span>EGP135.00</span>
            <br />
            EGP100.00
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
