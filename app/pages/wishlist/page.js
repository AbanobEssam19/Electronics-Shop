"use client";
import "../../globals.css";
import styles from "./page.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { library } from "@fortawesome/fontawesome-svg-core";

import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

import Link from "next/link";

import Nav from "@/app/components/Nav/nav";
import Footer from "@/app/components/Footer/footer";

import { useEffect, useState } from "react";

library.add(fab, fas, far);

function WishlistItem() {
    return (
        <tr>
            <td ><input type="checkbox" className={styles.center} /></td>
            <td>
                <div className={styles.center}>
                    <img
                        className={styles.product_image}
                        src="../product1.jpg"
                    />
                </div>
            </td>
            <td>AC Light Dimmer SCR (220V-2000W) and AC Motor</td>
            <td>100.00 EGP</td>
            <td>
                <div className={styles.state}>
                    <FontAwesomeIcon icon="fa-regular fa-circle-check" />
                    <p>In Stock</p>
                </div>
            </td>
            <td>
                <div className={styles.center}>
                    <button className={styles.add_to_cart_button}>Add to Cart</button>
                </div>
            </td>
        </tr>
    )
}

export default function Wishlist() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('bootstrap/dist/js/bootstrap.bundle.min.js');
        }

        const fetchUser = async () => {
            const res = await fetch("/user");
            const data = await res.json();
            setUser(data.user);
            console.log(user);
        }

        fetchUser()
    }, []);

    return (
        <>
            <Nav />
            <div className={`container ${styles.main}`} >
                <h1>Your Wishlist</h1>
                <table>
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
                        <WishlistItem /> 
                        <WishlistItem /> 
                        <WishlistItem /> 
                        <WishlistItem /> 
                        <WishlistItem /> 
                        <WishlistItem /> 
                        <WishlistItem /> 
                    </tbody>
                </table>

                <div className={styles.bom}>
                    <div className={styles.ri}>
                        <select className={styles.sco} name="cars" id="cars">
                            <option disabled="true" >ACTIONS</option>
                            <option value="all">Add to cart</option>
                            <option value="some">Remove</option>
                        </select>
                        <button className={styles.bot}>Apply</button>
                    </div>
                    <div className={styles.ff}>
                        <button className={styles.bot}>Remove All</button>
                        <button className={styles.bot}>Add All to card</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}