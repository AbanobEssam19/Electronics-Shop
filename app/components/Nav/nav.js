'use client'
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
                    <img src="../logo.png" />
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
                <ul className={styles.mainNav}>
                    <li><Link href="#">Home</Link></li>
                    <li className={styles.categoriesLink}>
                        <Link href="/" >Categories <FontAwesomeIcon icon="fa-solid fa-caret-down" /></Link>
                        <div className={styles.categoriesDropDown} >
                            <ul>
                                <li><Link href="#">Home</Link></li>
                                <li><Link href="/">Categories</Link></li>
                                <li><Link href="/">3D Printing</Link></li>
                                <li><Link href="/">About Us</Link></li>
                                <li><Link href="#">Home</Link></li>
                                <li><Link href="../Categories/page">Categories</Link></li>
                                <li><Link href="/">3D Printing</Link></li>
                                <li><Link href="/">About Us</Link></li>
                                <li><Link href="#">Home</Link></li>
                                <li><Link href="/">Categories</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li><Link href="/">3D Printing</Link></li>
                    <li><Link href="/">About Us</Link></li>
                </ul>
                
                <button className={styles.menuBtn} type='button' data-bs-toggle="offcanvas" data-bs-target="#navSideBar" >
                    <FontAwesomeIcon className={styles.menuIcon} icon="fa-solid fa-bars" />
                    <p>Menu</p>
                </button>
                
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

            <div className={`offcanvas offcanvas-start`} id="navSideBar" style={{width: "350px"}}>
                <div className={`offcanvas-header ${styles.sideBarHeader}`}>
                    <div className={styles.sideBarLogo}>
                        <img src='../side-bar-logo.png' />
                    </div>
                    <button type="button" data-bs-dismiss="offcanvas"><FontAwesomeIcon icon="fa-solid fa-xmark" style={{width: "20px", height: "20px"}} /></button>
                </div>
                <div className={`offcanvas-body ${styles.sideBarBody}`}>
                    <li className={styles.sideNavItem}>
                        <Link href="#"><FontAwesomeIcon icon="fa-solid fa-house" /> Home</Link>
                    </li>
                    <li className={styles.sideNavItem}>
                        <button className={styles.categoriesBtn} data-bs-toggle="collapse" data-bs-target="#categoriesCollapse"><FontAwesomeIcon icon="fa-solid fa-list" /> Categories</button>
                    </li>
                    <div id="categoriesCollapse" className={`collapse ${styles.categoriesSideNav}`}>
                        
                        <li className={styles.sideNavItem}><Link href="#">Home</Link></li>
                        <li className={styles.sideNavItem}><Link href="/">Categories</Link></li>
                        <li className={styles.sideNavItem}><Link href="/">3D Printing</Link></li>
                        <li className={styles.sideNavItem}><Link href="/">About Us</Link></li>
                        
                    </div>
                    <li className={styles.sideNavItem}>
                        <Link href="/"><FontAwesomeIcon icon="fa-brands fa-unity" /> 3D Printing</Link>
                    </li>
                    <li className={styles.sideNavItem}>
                        <Link href="/"><FontAwesomeIcon icon="fa-solid fa-address-card" /> About Us</Link>
                    </li>
                    <li className={styles.sideNavItem}>
                        <Link href="/"><FontAwesomeIcon icon="fa-solid fa-heart" /> Wishlist</Link>
                    </li>
                    <li className={styles.sideNavItem}>
                        <Link href="/"><FontAwesomeIcon icon="fa-solid fa-user" /> Sign in</Link>
                    </li>

                </div>
            </div>
        </div>
    )
}

export default function Nav() {
    return (
        <div className={styles.main}>
            <Nav1 />
            <Nav2 />
        </div>
    )
}