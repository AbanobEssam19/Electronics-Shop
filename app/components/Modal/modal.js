import { useEffect, useState, useRef } from "react";
import styles from "./modal.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Link from "next/link";

export default function Modal(product) {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [photo, setPhoto] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [popularity, setPopularity] = useState("");


  useEffect(() => {
    if (product.currentProduct) {
      setName(product.currentProduct.name);
      setCategories(product.currentProduct.categories);
      setPrice(product.currentProduct.price);
      setDiscount(product.currentProduct.discount);
      setPhoto(product.currentProduct.photo);
      setQuantity(product.currentProduct.quantity);
      setPopularity(product.currentProduct.popularity);
    }
  }, [product.currentProduct]);


  const amountRef = useRef();
  
  const closeBtn = useRef(null);

  function increaseAmount() {
    amountRef.current.value = parseInt(amountRef.current.value) + 1;
  }

  function decreaseAmount() {
    if (amountRef.current.value > 1)
      amountRef.current.value = amountRef.current.value - 1;
  }

  if (!product) {
    return <h1>Loading...</h1>
  }

  return (
    
    <div
      className="modal fade"
      id="modalProduct"
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
              ref={closeBtn}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className={`modal-body ${styles.ModelBody}`}>
            <div className={styles.LeftPart}>
              <img src={photo ? photo[0] : ""} />
            </div>
            <div className={styles.RightPart}>
              <h1 className={styles.ProductText}>
                {name}
              </h1>
              <div className={styles.state} style={quantity > 0 ? {} : { backgroundColor: "#ff00000a" }}>
                <FontAwesomeIcon
                  icon={`fa-regular fa-circle-${quantity > 0 ? "check" : "xmark"}`}
                  style={quantity > 0 ? { color: "#54ca87" } : {color: "red"}}
                />
                <p style={quantity > 0 ? {} : { color: "red" }}>{quantity > 0 ? "In" : "Out of"} Stock</p>
              </div>
              <div className={styles.price}>
                <p>{price}.00 EGP</p>
                <del style={discount > 0 ? {} : { display: "none" }}>{Math.floor((price / (100 - discount)) * 100)}.00 EGP</del>
              </div>
              <div className={styles.buttonsBox}>
                <div className={styles.amountContainer}>
                  <button onClick={decreaseAmount}>-</button>
                  <input type="number" value={1} ref={amountRef} />
                  <button onClick={increaseAmount}>+</button>
                </div>
                <button disabled={quantity == 0} >Add to cart</button>
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
                {categories && categories.map((category) => (
                  <><Link href={`/pages/products?category=${category.toLowerCase()}`} onClick={() => closeBtn.current.click()} >{category}</Link>  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}