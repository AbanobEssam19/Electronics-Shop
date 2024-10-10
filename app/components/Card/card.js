import { udpateData, udpateModal } from "@/app/states/reducers/modalSlice";
import styles from "./card.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Link from "next/link";

import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { udpateUser } from "@/app/states/reducers/userSlice";
import { udpateCarts } from "@/app/states/reducers/cartsSlice";

export default function Card({ product }) {

  const dispatch = useDispatch();

  if (!product) {
    return <div>Loading...</div>;
  }

  async function addItem() {
    let token = localStorage.getItem('token');

    if (!token)
      token = sessionStorage.getItem('token');

    const res = await fetch(`/api/cartitem/${product._id}/${1}`, {
      method: "POST",
      headers: {
        "token": `${token}`
      }
    });

    const data = await res.json();

    if (data.success) {
      dispatch(udpateUser(data.user));
      dispatch(udpateCarts(data.carts));
    }
  }

  const products = useSelector((state) => state.productsData.data);
  const user = useSelector((state) => state.userData.data);
  const carts = useSelector((state) => state.cartsData.data);

  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    setInCart(false);
    user && carts && products && user.cart.map((id) => {
      const details = carts.find((item) => item._id == id);
      const check = products.find((item) => item._id == details.product);
      if (check._id == product._id) {
        setInCart(true);
        return;
      }
    });
  }, [user])

  return (
    <div className={`${styles.wholeCard}`}>
      <div className={styles.cardImg}>
        <Link href={`/pages/product?id=${product._id}`}>
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
          onClick={() => dispatch(udpateModal(product))}
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
        <button className={styles.shoppingCart} onClick={addItem} disabled={inCart}>
          <FontAwesomeIcon
            icon={`fa-solid fa-${inCart ? "check" : "cart-shopping"}`}
            style={{
              width: "30px",
              height: "14px",
              color: "black",
              marginTop: "5px"
            }}
          />
        </button>
      </div>
    </div>
  );
}