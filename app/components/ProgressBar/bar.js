'use client'
import styles from "./bar.module.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Link from "next/link";

import { useEffect, useRef } from 'react';

export default function ProgressBar(props) {

    const num = props.step;

    const colored = <div className={styles.bar} style={{backgroundColor: "var(--main)"}}></div>;
    const normal = <div className={styles.bar} ></div>;
    const check = <FontAwesomeIcon icon="fa-solid fa-check" />;

    return (
        <div className={styles.progressBar}>
            <div className={styles.processStep} >
                <div className={styles.processNum} >
                    <p>{num >= 1 ? check : 1}</p>
                </div>
                <div className={styles.processDetails} >
                    <p>SHOPPING CART</p>
                    <p>View your items</p>
                </div>
                {num >= 1 ? colored : normal}
            </div>
            <div className={styles.processStep} >
                <div className={styles.processNum} >
                    <p>{num >= 2 ? check : 2}</p>
                </div>
                <div className={styles.processDetails} >
                    <p>SHIPPING AND CHECKOUT</p>
                    <p>Enter your details</p>
                </div>
                {num >= 2 ? colored : normal}
            </div>
            <div className={styles.processStep} >
                <div className={styles.processNum} >
                    <p>{num >= 3 ? check : 3}</p>
                </div>
                <div className={styles.processDetails} >
                    <p>COMFIRMATION</p>
                    <p>Review your order</p>
                </div>
                {num >= 3 ? colored : normal}
            </div>
        </div>
    );
}