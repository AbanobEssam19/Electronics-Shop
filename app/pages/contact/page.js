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

import { useEffect } from "react";

library.add(fab, fas, far);

export default function Contact() {

    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('bootstrap/dist/js/bootstrap.bundle.min.js');
        }
    }, []);

    return (
        <>
            <Nav />
            <section className={styles["contact-page-section"]}>
                <div className={styles["container"]}>
                    <div className={styles["sec-title"]}>
                        <h2>Let's Get in Touch.</h2>
                    </div>
                    <div className={styles["inner-container"]}>
                        <div className={styles["form-column"]}>
                            <div className={styles["inner-column"]}>
                                <div className={styles["contact-form"]}>
                                    <form id="contact-form">
                                        <div>
                                            <div className={styles["form-group"]}>
                                                <input type="text" name="name" value="" placeholder="Name" required />
                                            </div>
                                            <div className={styles["form-group"]}>
                                                <input type="email" name="email" value="" placeholder="Email" required />
                                            </div>
                                            <div className={styles["form-group"]}>
                                                <input type="text" name="subject" value="" placeholder="Subject" required />
                                            </div>
                                            <div className={styles["form-group"]}>
                                                <input type="text" name="phone" value="" placeholder="Phone" required />
                                            </div>
                                            <div className={styles["form-group"]}>
                                                <textarea name="message" placeholder="Massage"></textarea>
                                            </div>
                                            <div className={styles["form-group"]}>
                                                <button type="submit" class={`${styles["theme-btn"]} ${styles["btn-style-one"]}`}>Send Now</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className={styles["info-column"]}>
                            <div className={styles["inner-column"]}>
                                <h2>Contact Info</h2>
                                <ul className={styles["list-info"]}>
                                    <li><FontAwesomeIcon icon="fas fa-globe" />132 Shobra street - Cairo - Egypt.</li>
                                    <li><FontAwesomeIcon icon="far fa-envelope" />example@test</li>
                                    <li>
                                        <FontAwesomeIcon icon="fas fa-phone" />1-234-567-890 <br />
                                        1-234-567-890
                                    </li>
                                </ul>
                                <ul className={styles["social-icon-four"]}>
                                    <li className={styles["follow"]}>Follow on:</li>
                                    <li>
                                        <Link href="https://www.facebook.com"><FontAwesomeIcon icon="fab fa-facebook-f" /></Link>
                                    </li>
                                    <li>
                                        <Link href="https://www.instagram.com"><FontAwesomeIcon icon="fab fa-instagram" /></Link>
                                    </li>
                                    <li>
                                        <Link href="https://www.linkedin.com"><FontAwesomeIcon icon="fab fa-linkedin" /></Link>
                                    </li>
                                    <li>
                                        <Link href="https://www.whatsapp.com"><FontAwesomeIcon icon="fab fa-whatsapp" /></Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}