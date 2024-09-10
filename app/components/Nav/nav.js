import '../../globals.css';
import styles from "./nav.module.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { library } from '@fortawesome/fontawesome-svg-core'

import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import Link from "next/link";

library.add(fab, fas, far)

function Nav1() {
    return (
        <div className={`container ${styles.nav1}`}>
            <Link href="/" className={styles.navHeader}>
                <div className={styles.logoContainer}>
                    <img src="../logo.jpg" />
                </div>
                <h1>Electronic Shop</h1>
            </Link>
            
            <div className={styles.searchBarContainer} >
                <input type="text" className={styles.searchBar} />
                <button type="submit" className={styles.searchBtn}><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /></button>
            </div>
            <input type="button" value="Login" className={styles.loginBtn} />
        </div>
    )
}

function Nav2() {
    return (
        <div className={`container-fluid ${styles.nav2}`}>
            <div className={`container ${styles.contentContainer}`} >
                <ul>
                    <li>Home</li>
                    <li>Categories</li>
                    <li>About Us</li>
                </ul>
                <div className={styles.menuBtn} >
                    <FontAwesomeIcon className={styles.menuIcon} icon="fa-solid fa-bars" />
                    <p>Menu</p>
                </div>
                <div className={styles.searchBarContainer} >
                    <input type="text" className={styles.searchBar} />
                    <button type="submit" className={styles.searchBtn}><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /></button>
                </div>
            </div>
        </div>
    )
}

export default function Nav() {
    return (
        <>
            <Nav1 />
            <Nav2 />
        </>
    )
}