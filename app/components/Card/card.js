import styles from "./card.module.css";

import "bootstrap/dist/css/bootstrap.min.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { library } from "@fortawesome/fontawesome-svg-core";

import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

import Link from "next/link";

library.add(fab, fas, far);

import { useState, useRef, useEffect } from "react";

export default function Card({ product }) {
  if (!product) {
    return <div>Loading...</div>;  // Fallback in case product is still undefined
  }

  return (
    <div className={`${styles.wholeCard}`}>
      <div className={styles.cardImg}>
        <Link href="/pages/product">
          <img src={product.photo[0]} />
          <div className={styles.discount}>{product.discount}%</div>
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

        <Modal product={product} />

      </div>
      <Link href="/" className={styles.anchor}>
        <h3 className={styles.title}>{product.name}</h3>
      </Link>
      <div className={styles.lowerPart}>
        <div className={styles.price}>
          <p>
            <span>{Math.floor((product.price / (100 - product.discount)) * 100)}.00EGP</span>
            <br />
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


function Modal({ product }) {
  
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [photo, setPhoto] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [popularity, setPopularity] = useState("");


  useEffect(() => {
    setName(product.name);
    setCategories(product.categories);
    setPrice(product.price);
    setDiscount(product.discount);
    setPhoto(product.photo);
    setQuantity(product.quantity);
    setPopularity(product.popularity);
  }, [product]);


  const amountRef = useRef();

  function increaseAmount() {
    amountRef.current.value = parseInt(amountRef.current.value) + 1;
  }

  function decreaseAmount() {
    if (amountRef.current.value > 1)
      amountRef.current.value = amountRef.current.value - 1;
  }
  return (
    <div
      className="modal fade"
      id="exampleModalCenter"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-xl"
        role="document"
      >
        <div
          className={`modal-content ${styles.ModelContent}`}
        >
          <div
            className="modal-header border-0"
            style={{ position: "relative" }}
          >
            <h5 className="modal-title" id="exampleModalLongTitle"></h5>
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
                <img src={photo[0]} />
              </Link>
            </div>
            <div className={styles.RightPart}>
              <h1 className={styles.ProductText}>
                {name}
              </h1>
              <div className={styles.state}>
                <FontAwesomeIcon
                  icon="fa-regular fa-circle-check"
                  style={{ color: "#54ca87" }}
                />
                <p>In Stock</p>
              </div>
              <div className={styles.price}>
                <p>{price}.00 EGP</p>
                <del>{Math.floor((price / (100 - discount)) * 100)}.00 EGP</del>
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
                  <strong>Other people want this</strong>, {popularity} people have
                  this in their carts right now.
                </p>
              </div>
              <div className={styles.categories}>
                <p style={{ display: "inline" }}>categories: </p>
                {categories.map((category) => (
                  <Link href="/pages/categories" >{category} </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}