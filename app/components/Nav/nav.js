import '../../globals.css';
import styles from "./nav.module.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { library } from '@fortawesome/fontawesome-svg-core'

import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import Link from "next/link";

library.add(fab, fas, far);

function Nav1() {
    return (
        <div className={`container ${styles.nav1}`}>
            <Link href="/" className={styles.navHeader}>
                <div className={styles.logoContainer}>
                    <img src="../logo.jpg" />
                </div>
                <h1>AB Electronics</h1>
            </Link>
            
            <div className={styles.searchBarContainer} >
                <input type="text" className={styles.searchBar} placeholder='Search for products...' />
                <button className={styles.searchBtn}><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" style={{width: "25px"}} /></button>
            </div>

            <Link href="/" className={styles.navBtns} >
                <FontAwesomeIcon icon="fa-regular fa-user" style={{width: "30px", height: "25px"}} />
                <p>Sign in</p>
            </Link>

            <Link href="/" className={`${styles.navBtns} ${styles.wishlist}`} title='Wishlist' >
                <div className={styles.counter} >
                    <p>0</p>
                </div>
                <FontAwesomeIcon icon="fa-regular fa-heart" style={{width: "40px", height: "30px"}} />
            </Link>

            <Link href="/" className={styles.navBtns} >
                <div className={styles.counter} >
                    <p>0</p>
                </div>
                <FontAwesomeIcon icon="fa-solid fa-cart-shopping" style={{width: "40px", height: "30px"}} />
                <div className={styles.cartInfoContainer}>
                    <p>Total</p>
                    <p className={styles.cartTotal} >0.00EGP</p>
                </div>
            </Link>
        </div>
    )
}

function Nav2() {
    return (
        <div className={`container-fluid ${styles.nav2}`}>
            <div className={`container ${styles.contentContainer}`} >
                <ul>
                    <li><Link href="#">Home</Link></li>
                    <li><Link href="/">Categories</Link></li>
                    <li><Link href="/">3D Printing</Link></li>
                    <li><Link href="/">About Us</Link></li>
                </ul>
                
                <div className={styles.menuBtn} >
                    <FontAwesomeIcon className={styles.menuIcon} icon="fa-solid fa-bars" />
                    <p>Menu</p>
                </div>
                
                <div className={styles.searchBarContainer} >
                    <input type="text" className={styles.searchBar} placeholder='Search for products...' />
                    <button type="submit" className={styles.searchBtn}>
                        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" style={{width: "25px"}} />
                    </button>
                </div>

                <button className={styles.navBtns} >
                    <FontAwesomeIcon icon="fa-solid fa-cart-shopping" style={{width: "40px", height: "30px"}} />
                </button>
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