"use client";
import styles from "./page.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Link from "next/link";

function WishlistItem() {
    return (
        <tr>
            <td ><input type="checkbox" className={styles.center} /></td>
            <td>
                <div className={styles.center}>
                    <img
                        className={styles.product_image}
                        src="https://res.cloudinary.com/dckocjoan/image/upload/v1727711600/ac_light_dimmer_1.jpg"
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
    return (
        <>
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
        </>
    )
}