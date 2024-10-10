'use client'
import ProgressBar from "@/app/components/ProgressBar/bar";
import styles from "./page.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { fetchUser } from "@/app/states/APIs/apis";
import { useSearchParams } from "next/navigation";
import { udpateUser } from "@/app/states/reducers/userSlice";

export default function Checkout() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userData.data);
  const carts = useSelector((state) => state.cartsData.data);
  const products = useSelector((state) => state.productsData.data);

  const searchParams = useSearchParams();
  const shipping = searchParams.get('shipping');

  useEffect(() => {
    let token = localStorage.getItem('token');

    if (!token)
      token = sessionStorage.getItem('token');

    dispatch(fetchUser(token));
  }, []);

  const total = useMemo(() => {
    if (!user || !carts || !products) return 0;

    let newTotal = 0;
    user.cart.forEach((id) => {
      const details = carts.find((cart) => cart._id === id);
      if (details) {
        const product = products.find((product) => product._id === details.product);
        if (product) {
          newTotal += product.price * details.quantity;
        }
      }
    });

    return newTotal;
  }, [user]);

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    notes: ''
  });

  useEffect(() => {
    if (!user)
      return;
    setUserData({
      ...userData,
      firstName: user.firstname,
      lastName: user.lastname,
      address: user.address,
      city: user.city,
      state: user.state,
      shipping: shipping
    });
  }, [user, shipping])

  function updateData(e) {
    const { id, value } = e.target;
    setUserData({
      ...userData,
      [id]: value
    });
  };

  async function checkout(e) {
    e.preventDefault();

    const res = await fetch(`/api/order/${user._id}`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(userData)
    });

    const data = await res.json();

    if (data.success) {
      dispatch(udpateUser(data.user));
      window.location.href = "/pages/myaccount/orders";
    }

  }

  if (!user) {
    return <div>Error 404</div>;
  }
  
  return (
    <form className="container" style={{ marginTop: '50px' }}>
      <ProgressBar step={2} />
      <div className={`container ${styles.main}`}>
        <div className={styles.formClass}>
          <div className={styles.inputCollection}>
            <div className={styles.inputWrapper}>
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                value={userData.firstName}
                onChange={updateData}
                required
              />
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                value={userData.lastName}
                onChange={updateData}
                required
              />
            </div>
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="address">Street address *</label>
            <input
              type="text"
              id="address"
              value={userData.address}
              onChange={updateData}
              required
              placeholder="House number and street name"
            />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="city">Town / City *</label>
            <input
              type="text"
              id="city"
              value={userData.city}
              onChange={updateData}
              required
            />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="state">Governorate *</label>
            <select id="state" value={userData.state} onChange={updateData} required>
              <option value="Cairo">Cairo</option>
              <option value="Giza">Giza</option>
            </select>
          </div>
          <div className={styles.inputCollection}>
            <div className={styles.inputWrapper}>
              <label htmlFor="phone">Phone *</label>
              <input
                type="text"
                id="phone"
                value={user && user.phone}
                required
                disabled
              />
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                value={user && user.email}
                required
                disabled
              />
            </div>
          </div>
          <h6 style={{ fontWeight: 'bold' }}>Additional information</h6>
          <div className={styles.inputWrapper}>
            <label htmlFor="notes">Order Notes</label>
            <textarea
              style={{ borderRadius: '8px', height: '100px', padding: '10px' }}
              id="notes"
              placeholder="Notes about your order"
              value={userData.notes || ''}
              onChange={updateData}
            />
          </div>
        </div>
        <div className={` ${styles.order} container`}>
          <h6 style={{ fontWeight: "bold" }}>YOUR ORDER</h6>

          <div className={styles.orderTable}>
            <div className={styles.orderHeader}>
              <p>Product</p>
              <p>Subtotal</p>
            </div>
            <div className={styles.orderBody}>
              {
                user && products && carts && user.cart.map((id) => {
                  const details = carts.find((item) => item._id == id);
                  const product = products.find((item) => details.product == item._id);
                  return (
                    <div className={styles.orderData}>
                      <p>{product.name} <span style={{ color: "red" }}>x{details.quantity}</span></p>
                      <p>{product.price * details.quantity}.00 EGP</p>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className={styles.orderHeader} >
            <h6 style={{ fontWeight: "bold" }}>Cash on Delivery</h6>
            <p>{ }.00 EGP</p>
          </div>
          <div className={styles.group}>
            <p style={{ fontWeight: "bold" }}>Total</p>
            <p style={{ fontWeight: "bold" }}>{total}.00 EGP</p>
          </div>
          <button type="submit" onClick={checkout}>Place Order</button>
        </div>
      </div>
    </form>
  );
}