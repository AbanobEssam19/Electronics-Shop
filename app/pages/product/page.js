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
          <Carousel product={product} />
          <div className={styles.productDetails}>
            <h3 className={styles.title}>{product.name}</h3>
            <div className={styles.state}>
              <FontAwesomeIcon icon="fa-regular fa-circle-check" />
              <p>In Stock</p>
            </div>
            <div className={styles.price}>
              <p>{product.price}EGP</p>
              <del>
                {Math.floor((product.price / (100 - product.discount)) * 100)}
                EGP
              </del>
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
                <strong>Other people want this</strong>, {product.popularity}{" "}
                people have this in their carts right now.
              </p>
            </div>
            <div className={styles.categories}>
              <p style={{ display: "inline" }}>categories: </p>
              {product.categories.map((category) => (
                <>
                  <Link
                    href={`/pages/products?category=${category.toLowerCase()}`}
                    onClick={() => closeBtn.current.click()}
                  >
                    {category}
                  </Link>{" "}
                </>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.productDescription}>
          <h4>Description:</h4>
          <p>
            {product.description.map((desc) => (
              <>
                <p>{desc}</p>
              </>
            ))}
            <br />
            <br />
            Specifications:
            {product.specifications.map((spec) => (
              <>
                <p>{spec}</p>
              </>
            ))}
          </p>
        </div>
        <RelatedProducts product={product} />
      </div>
    </>
  );
}

function RelatedProducts({ product }) {
  const products = useSelector((state) => state.productsData.data);
  const container = useRef();
  const [RelatedProducts, setRelatedProducts] = useState(null);
  useEffect(() => {
    if (!products) {
      return;
    }
    let set = new Set();
    product.categories.map((cat) => {
      products.map((pro) => {
        product != pro && pro.categories.includes(cat) && set.add(pro);
      });
    });
    setRelatedProducts(set);
  }, [products]);

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
          {RelatedProducts &&
            Array.from(RelatedProducts).map((rel, index) => (
              <Card key={index} product={rel} />
            ))}
        </div>
        <button onClick={slideRight}>&gt;</button>
      </div>
    </div>
  );
}
