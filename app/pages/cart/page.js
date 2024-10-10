'use client'
import styles from "./page.module.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Link from "next/link";

import ProgressBar from '@/app/components/ProgressBar/bar';

import { useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { udpateUser } from "@/app/states/reducers/userSlice";
import { useState } from "react";
import { udpateCarts } from "@/app/states/reducers/cartsSlice";
import { useEffect } from "react";

function CartItem({product, cart}) {

    
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userData.data);
    const carts = useSelector((state) => state.cartsData.data);
    const products = useSelector((state) => state.productsData.data);

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
            dispatch(udpateUser(data.user));
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
            dispatch(udpateCarts(data.carts));
            dispatch(udpateUser(data.user));
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

    const shippingText  = useRef();

    function ShippingDeclaration(e) {
        let id = e.target.id;
        if (id == "shipping") {
            shippingText.current.innerText = "Shipping price will be added during checkout";
        }
        else if (id == "pickup") {
            shippingText.current.innerText = "Address : 132 Shobra street - Cairo - Egypt";
        }
    }

    const [total, setTotal] = useState(0);

    useEffect(() => {
        let newTotal = 0;
        user && carts && products && user.cart.map((id) => {
        const details = carts.find((cart) => cart._id == id);
        if (details) {
            const product = products.find((product) => product._id == details.product);
            newTotal += product.price * details.quantity;
        }
        });
        setTotal(newTotal);
    }, [user]);

    return (
        <>
            <div className={`container ${styles.main}`} >
                <ProgressBar step={1} />
                <div className={styles.content} >
                    <table className={styles.products} >
                        <thead>
                            <tr>
                                <th style={{width: "50%"}} >PRODUCT</th>
                                <th style={{width: "15%"}} >UNIT PRICE</th>
                                <th style={{width: "15%"}} >QUANTITY</th>
                                <th style={{width: "15%"}} >SUBTOTAL</th>
                                <th style={{width: "5%"}} ></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                user && products && carts && user.cart.map((id) => {
                                    const cart = carts.find((item) => item._id == id);
                                    const product = products.find((item) => item._id == cart.product);
                                    return <CartItem product={product} cart={cart} />;
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
                        <Link href="/pages/checkout" >Proceed to checkout</Link>
                    </div>
                </div>
            </div>
        </>
    )
}