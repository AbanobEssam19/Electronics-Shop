'use client'
import styles from "./page.module.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "@/app/states/reducers/userSlice";
import { updateCarts } from "@/app/states/reducers/cartsSlice";
import { useEffect, useMemo, useState, useRef } from "react";
import EmptyCart from "../EmptyCart/page";
import Error from "../Error/page";

function CartItem({ product, cart }) {


    const dispatch = useDispatch();

    async function removeItem() {
        let token = localStorage.getItem('token');

        if (!token)
            token = sessionStorage.getItem('token');

        const res = await fetch(`/api/cartitem/${cart._id}`, {
            method: "DELETE",
            headers: {
                'token': `${token}`
            }
        });

        const data = await res.json();
        if (data.success) {
            dispatch(updateUser(data.user));
            dispatch(updateCarts(data.carts));
        }
    }

    const [itemQuantity, setItemQuantity] = useState(cart.quantity);

    const quantityInput = useRef(null);

    useEffect(() => {
        quantityInput.current.value = cart.quantity;
        setItemQuantity(cart.quantity);
    }, [cart]);

    async function setQuantity(num) {
        const quantity = (quantityInput.current.value != "" && parseInt(quantityInput.current.value)) + parseInt(num);

        if (quantity <= 0) {
            removeItem();
            return;
        }

        let token = localStorage.getItem('token');

        if (!token)
            token = sessionStorage.getItem('token');

        const res = await fetch(`/api/cartitem/${cart._id}/${quantity}`, {
            method: "PUT",
            headers: {
                'token': `${token}`
            }
        });

        const data = await res.json();
        if (data.success) {
            dispatch(updateCarts(data.carts));
            dispatch(updateUser(data.user));
            quantityInput.current.value = quantity;
            setItemQuantity(quantity);
        }
    }

    return (
        <tr className={styles.item} >
            <td>
                <img src={product.photo[0]} />
                <p>{product.name}</p>
            </td>
            <td className={styles.price} >{product.price}.00 EGP</td>
            <td>
                <div className={styles.amountContainer}>
                    <button onClick={() => setQuantity(-1)}>-</button>
                    <input type="number" ref={quantityInput} onBlur={() => setQuantity(0)} />
                    <button onClick={() => setQuantity(1)}>+</button>
                </div>
            </td>
            <td className={styles.total} >{itemQuantity * product.price}.00 EGP</td>
            <td>
                <button onClick={removeItem}>
                    <FontAwesomeIcon
                        icon="fa-solid fa-xmark" />
                </button>
            </td>
        </tr>
    )
}

export default function ShoppingCart() {

    const user = useSelector((state) => state.userData.data);
    const carts = useSelector((state) => state.cartsData.data);
    const products = useSelector((state) => state.productsData.data);

    const shippingText = useRef();

    const [shipping, setShipping] = useState(true);

    function ShippingDeclaration(e) {
        let id = e.target.id;
        if (id == "shipping") {
            shippingText.current.innerText = "Shipping price will be added during checkout";
            setShipping(true);
        }
        else if (id == "pickup") {
            shippingText.current.innerText = "Address : El-Abbasiya Street El Weili, Cairo - Egypt";
            setShipping(false);
        }
    }

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

    if (!user) {
        return <Error />;
    }

    if (user && !user.cart.length) {
        return <EmptyCart />;
    }

    return (
        <div className={`container ${styles.main}`} >
            <div className={styles.content} >
                <table className={styles.products} >
                    <thead>
                        <tr>
                            <th style={{ width: "50%" }} >PRODUCT</th>
                            <th style={{ width: "15%" }} >UNIT PRICE</th>
                            <th style={{ width: "15%" }} >QUANTITY</th>
                            <th style={{ width: "15%" }} >SUBTOTAL</th>
                            <th style={{ width: "5%" }} ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            user && products && carts && user.cart.map((id) => {
                                const cart = carts.find((item) => item._id == id);
                                const product = products.find((item) => item._id == cart.product);
                                return <CartItem key={id} product={product} cart={cart} />;
                            })
                        }
                    </tbody>
                </table>
                <div className={styles.totalSection}>
                    <p>CART TOTAL</p>
                    <div className={styles.section}>
                        <strong>Subtotal</strong>
                        <p>{total}.00 EGP</p>
                    </div>
                    <div className={`${styles.shippingOptions} ${styles.section}`} >
                        <strong>Shipping</strong>
                        <div>
                            <div>
                                <input type='radio' id='shipping' value='shipping' name='shippingOptions' defaultChecked onChange={ShippingDeclaration} />
                                <label htmlFor='shipping' >Shipping</label>
                            </div>
                            <div>
                                <input type='radio' id='pickup' value='pickup' name='shippingOptions' onChange={ShippingDeclaration} />
                                <label htmlFor='pickup' >Pick up from store</label>
                            </div>
                            <p ref={shippingText}>Shipping price will be added during checkout</p>
                        </div>
                    </div>
                    <div className={styles.section} >
                        <strong>Total</strong>
                        <p>{total}.00 EGP</p>
                    </div>
                    <Link href={`/pages/checkout?shipping=${shipping}`} >Proceed to checkout</Link>
                </div>
            </div>
        </div>
    )
}