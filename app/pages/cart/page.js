'use client'
import '../../globals.css';
import styles from "./page.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { library } from '@fortawesome/fontawesome-svg-core'

import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import Link from "next/link";

library.add(fab, fas, far);

import Nav from '@/app/components/Nav/nav';
import Footer from '@/app/components/Footer/footer';
import ProgressBar from '@/app/components/ProgressBar/bar';

import { useRef } from 'react';

function CartItem() {

    function removeItem(e) {
        e.target.closest(`.${styles.item}`).remove();
    }

    return (
        <tr className={styles.item} >
            <td>
                <img src='../product1.jpg' />
                <p>AC Light Dimmer SCR (220V-2000W) and AC Motor</p>
            </td>
            <td className={styles.price} >100.00 EGP</td>
            <td>
                <div className={styles.amountContainer}>
                    <button>-</button>
                    <input type="number" value={1} />
                    <button >+</button>
                </div>
            </td>
            <td className={styles.total} >100.00 EGP</td>
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

    const shippingText  = useRef();

    function ShippingDeclaration(e) {
        let id = e.target.id;
        console.log(id);
        if (id == "shipping") {
            shippingText.current.innerText = "Shipping price will be added during checkout";
        }
        else if (id == "pickup") {
            shippingText.current.innerText = "Address : 132 Shobra street - Cairo - Egypt";
        }
    }

    return (
        <>
            <Nav />
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
                            <CartItem />
                            <CartItem />
                            <CartItem />
                            <CartItem />
                            <CartItem />
                            <CartItem />
                            <CartItem />
                            <CartItem />
                        </tbody>
                    </table>
                    <div className={styles.totalSection}>
                        <p>CART TOTAL</p>
                        <div className={styles.section}>
                            <strong>Subtotal</strong>
                            <p>100.00 EGP</p>
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
                            <p>100.00 EGP</p>
                        </div>
                        <Link href="/" >Proceed to checkout</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}