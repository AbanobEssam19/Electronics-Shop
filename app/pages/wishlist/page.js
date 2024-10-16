"use client";
import { updateUser } from "@/app/states/reducers/userSlice";
import styles from "./page.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCarts } from "@/app/states/reducers/cartsSlice";

function WishlistItem({ id, selectedItems, setSelectedItems }) {
  const products = useSelector((state) => state.productsData.data);
  const [product, setProduct] = useState(null);
  useEffect(() => {
    if (products) setProduct(products.find((el) => el._id == id));
  }, [products]);
  if (!product) {
    return <div>loading...</div>;
  }
  const inStockStatusIcon = (
    <div className={product.quantity ? styles.state : styles.state2}>
      <FontAwesomeIcon
        icon={
          product.quantity
            ? "fa-regular fa-circle-check"
            : "fa-solid fa-circle-xmark"
        }
      />
      <p>{product.quantity ? "In Stock" : "Out of Stock"}</p>
    </div>
  );
  const handleCheck = (e) => {
    if (e.target.checked) {
      setSelectedItems((prev) => [...prev, product]);
    } else {
      setSelectedItems((prev) => prev.filter((el) => el._id !== product._id));
    }
  };
  return (
    <tr>
      <td>
        <input
          onChange={handleCheck}
          type="checkbox"
          className={styles.center}
        />
      </td>
      <td>
        <div className={styles.center}>
          <img
            className={styles.product_image}
            src={`${product["photo"][0]}`}
          />
        </div>
      </td>
      <td>{product.name}</td>
      <td>{product.price} EGP</td>
      <td>{inStockStatusIcon}</td>
      <td>
        <div className={styles.center}>
          <button className={styles.add_to_cart_button}>Add to Cart</button>
        </div>
      </td>
    </tr>
  );
}

export default function Wishlist() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productsData.data);
  const user = useSelector((state) => state.userData.data);
  const [selectedItems, setSelectedItems] = useState([]);
  const actionRef = useRef(null);
  const handleAddAll = async () => {
    const res = await fetch("/api/wishlist", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    if (data.success) {
      dispatch(updateUser(data.user));
      dispatch(updateCarts(data.carts));
    }
  };
  const handleRemoveAll = async () => {
    const res = await fetch("/api/wishlist", {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    if (data.success) {
      dispatch(updateUser({ ...user, wishlist: [] }));
    }
  };
  const handleApply = async () => {
    let res;
    if (actionRef.current.value == "add") {
      res = await fetch("/api/wishlistsome", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ selectedItems: selectedItems, user: user }),
      });
    } else {
      res = await fetch("/api/wishlistsome", {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ selectedItems: selectedItems, user: user }),
      });
    }
    const data = await res.json();
    if (data.success) {
      const modifiedUser = await data.modifiedUser;
      console.log(modifiedUser);
      dispatch(updateUser({ ...user, ...modifiedUser }));
      if (actionRef.current.value == "add") {
        const carts = await data.carts;
        dispatch(updateCarts(carts));
      }
    }
  };
  return (
    <>
      <div className={`container ${styles.main}`}>
        <h1>Your Wishlist</h1>
        <table style={{ overflow: "auto" }}>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Product Name</th>
              <th>Unit Price</th>
              <th>Stock Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {user &&
              user.wishlist.map((id) => {
                return (
                  <WishlistItem
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                    id={id}
                  />
                );
              })}
          </tbody>
        </table>

        <div className={styles.bom}>
          <div className={styles.ri}>
            <select
              ref={actionRef}
              className={styles.sco}
              name="cars"
              id="cars"
            >
              <option disabled>ACTIONS</option>
              <option value="add">Add to cart</option>
              <option value="remove">Remove</option>
            </select>
            <button onClick={handleApply} className={styles.bot}>
              Apply
            </button>
          </div>
          <div className={styles.ff}>
            <button onClick={handleRemoveAll} className={styles.bot}>
              Remove All
            </button>
            <button onClick={handleAddAll} className={styles.bot}>
              Add All to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
