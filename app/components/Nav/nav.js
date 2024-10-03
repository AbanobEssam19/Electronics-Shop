"use client";
import styles from "./nav.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";


function CartItem() {

  function removeCartItem(e) {
    e.target.closest(`.${styles.cartItemContainer}`).remove();
  }

  return (
    <div className={styles.cartItemContainer} >
      <div className={styles.imgContainer} >
        <img src="https://res.cloudinary.com/dckocjoan/image/upload/v1727711600/ac_light_dimmer_1.jpg" />
      </div>
      <div className={styles.itemInfo} >
        <div className={styles.itemInfoHead}>
          <p className={styles.title} >AC Light Dimmer SCR (220V-2000W) and AC Motor</p>
          <button onClick={removeCartItem}>
            <FontAwesomeIcon
              icon="fa-solid fa-xmark" />
          </button>
        </div>
        <div className={styles.quantity} >
          <div className={styles.quantityButtons} >
            <button>-</button>
            1
            <button>+</button>
          </div>
          <p className={styles.price} >100.00 EGP</p>
        </div>
      </div>
    </div>
  )
}

function Nav1({user}) {

  const cartButton = useRef(null);
  const checkoutButton = useRef(null);
  const closeCartButton = useRef(null);
  const veiwCartButton = useRef(null);

  function checkUser(e) {
    if (user == null) {
      
    }
    else {
      cartButton.current.click();
    }
  }

  function logout() {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    window.location.href = "/";
  }

  const closeButton = useRef(null);

  const [searchValue, setSearchValue] = useState("");

  return (
    <div className={`container ${styles.nav1}`}>
      <Link href="/" className={styles.navHeader}>
        <div className={styles.logoContainer}>
          <img src="https://res.cloudinary.com/dckocjoan/image/upload/v1727851294/logo_zdcp3q.png" />
        </div>
        <h1>AB Electronics</h1>
      </Link>

      <div className={styles.searchBarContainer}>
        <input
          type="text"
          className={styles.searchBar}
          placeholder="Search for products..."
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Link className={styles.searchBtn} href={`../pages/products?search=${searchValue}`}>
          <FontAwesomeIcon
            icon="fa-solid fa-magnifying-glass"
          />
        </Link>
      </div>

      <Link href="../pages/sign" className={styles.navBtns}>
        <FontAwesomeIcon
          icon="fa-regular fa-user"
          style={{ width: "30px", height: "25px" }}
        />
        <div style={{display: "flex", flexDirection: "column"}}>
          {user != null ? <p style={{color: "gray", fontSize: "small"}}>Welcome</p> : ""}
          <p style={{fontWeight: "bold"}}>{user != null ? user.username : "Sign in"}</p>
        </div>
      </Link>

      <Link
        href="../pages/wishlist"
        className={`${styles.navBtns} ${styles.wishlist}`}
        title="Wishlist"
      >
        <div className={styles.counter}>
          <p>{user != null ? user.wishlist.length : 0}</p>
        </div>
        <FontAwesomeIcon
          icon="fa-regular fa-heart"
          style={{ width: "40px", height: "30px" }}
        />
      </Link>

      <button className={styles.navBtns} onClick={checkUser}>
        <div className={styles.counter}>
          <p>{user != null ? user.cart.length : 0}</p>
        </div>
        <FontAwesomeIcon
          icon="fa-solid fa-cart-shopping"
          style={{ width: "40px", height: "30px" }}
        />
      </button>
      <button data-bs-toggle="offcanvas"
          data-bs-target="#cartSideBar"
          style={{display: "none"}}
          ref={cartButton}></button>
      <div
        className={`offcanvas offcanvas-end`}
        id="cartSideBar"
      >
        <div className={`offcanvas-header ${styles.cartHeader}`}>
          <p>CART ({user ? user.cart.length : 0})</p>
          <button type="button" data-bs-dismiss="offcanvas" ref={closeCartButton}>
            <FontAwesomeIcon
              icon="fa-solid fa-xmark"
              style={{ width: "20px", height: "20px" }}
            />
          </button>
        </div>
        <div className={`offcanvas-body ${styles.cartBody}`}>
          <div className={styles.itemContainer}>
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
          </div>
          <div className={styles.cartFooter}>
            <div className={styles.total}>
              <p>TOTAL:</p>
              <p>100.00 EGP</p>
            </div>
            <div className={styles.footerLinks}>
              <Link href="../pages/cart" onClick={() => closeCartButton.current.click()} >VIEW CART</Link>
              <Link href="../pages/checkout" onClick={() => closeCartButton.current.click()} >CHECKOUT</Link>
            </div>
          </div>
        </div>
      </div>
      <button onClick={logout} style={user ? {} : {display: "none"}}>
        Logout
      </button>
    </div>
  );
}

function Nav2({user}) {
  const closeMenuButton = useRef(null);

  const [searchValue, setSearchValue] = useState("");

  return (
    <div className={`container-fluid ${styles.nav2}`}>
      <div className={`container ${styles.contentContainer}`}>
        <ul className={styles.mainNav}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li className={styles.categoriesLink}>
            <p>
              Categories <FontAwesomeIcon icon="fa-solid fa-caret-down" />
            </p>
            <div className={styles.categoriesDropDown}>
              <ul>
                <li>
                  <Link href="/pages/products?category=all">All</Link>
                </li>
                <li>
                  <Link href="/pages/products?category=motor">Motors</Link>
                </li>
                <li>
                <Link href="/pages/products?category=led">LED</Link>
                </li>
                <li>
                  <Link href="/pages/products?category=module">Modules</Link>
                </li>
                <li>
                  <Link href="/pages/products?category=sensor">Sensors</Link>
                </li>
                <li>
                  <Link href="/pages/products?category=microcontroller">Microcontrollers</Link>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <Link href="../pages/printing">3D Printing</Link>
          </li>
          <li>
            <Link href="../pages/contact">Contact Us</Link>
          </li>
        </ul>

        <button
          className={styles.menuBtn}
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#navSideBar"
        >
          <FontAwesomeIcon
            className={styles.menuIcon}
            icon="fa-solid fa-bars"
          />
          <p>Menu</p>
        </button>

        <div className={styles.searchBarContainer}>
          <input
            type="text"
            className={styles.searchBar}
            placeholder="Search for products..."
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Link className={styles.searchBtn} href={`../pages/products?search=${searchValue}`}>
            <FontAwesomeIcon
              icon="fa-solid fa-magnifying-glass"
            />
          </Link>
        </div>

        <button className={styles.navBtns}
          data-bs-toggle="offcanvas"
          data-bs-target="#cartSideBar">
          <FontAwesomeIcon
            icon="fa-solid fa-cart-shopping"
            style={{ width: "40px", height: "30px" }}
          />
        </button>
      </div>

      <div
        className={`offcanvas offcanvas-start`}
        id="navSideBar"
        style={{ width: "350px" }}
      >
        <div className={`offcanvas-header ${styles.sideBarHeader}`}>
          <div className={styles.sideBarLogo}>
            <img src="https://res.cloudinary.com/dckocjoan/image/upload/v1727851295/side-bar-logo_jgrp2c.png" />
          </div>
          <button type="button" data-bs-dismiss="offcanvas" ref={closeMenuButton} >
            <FontAwesomeIcon
              icon="fa-solid fa-xmark"
              style={{ width: "20px", height: "20px" }}
            />
          </button>
        </div>
        <div className={`offcanvas-body ${styles.sideBarBody}`}>
          <li className={styles.sideNavItem}>
            <Link href="/" onClick={() => closeMenuButton.current.click()}>
              <FontAwesomeIcon icon="fa-solid fa-house" /> Home
            </Link>
          </li>
          <li className={styles.sideNavItem}>
            <button
              className={styles.categoriesBtn}
              data-bs-toggle="collapse"
              data-bs-target="#categoriesCollapse"
            >
              <FontAwesomeIcon icon="fa-solid fa-list" /> Categories
            </button>
          </li>
          <div
            id="categoriesCollapse"
            className={`collapse ${styles.categoriesSideNav}`}
          >
            <li className={styles.sideNavItem}>
              <Link href="/pages/products?category=all" onClick={() => closeMenuButton.current.click()}>All</Link>
            </li>
            <li className={styles.sideNavItem}>
              <Link href="/pages/products?category=motor" onClick={() => closeMenuButton.current.click()}>Motors</Link>
            </li>
            <li className={styles.sideNavItem}>
              <Link href="/pages/products?category=led" onClick={() => closeMenuButton.current.click()}>LED</Link>
            </li>
            <li className={styles.sideNavItem}>
              <Link href="/pages/products?category=module" onClick={() => closeMenuButton.current.click()}>Modules</Link>
            </li>
            <li className={styles.sideNavItem}>
              <Link href="/pages/products?category=sensor" onClick={() => closeMenuButton.current.click()}>Sensors</Link>
            </li>
            <li className={styles.sideNavItem}>
              <Link href="/pages/products?category=microcontroller" onClick={() => closeMenuButton.current.click()}>Microcontrollers</Link>
            </li>
          </div>
          <li className={styles.sideNavItem}>
            <Link href="/pages/printing" onClick={() => closeMenuButton.current.click()}>
              <FontAwesomeIcon icon="fa-brands fa-unity" /> 3D Printing
            </Link>
          </li>
          <li className={styles.sideNavItem}>
            <Link href="/pages/contact" onClick={() => closeMenuButton.current.click()}>
              <FontAwesomeIcon icon="fa-solid fa-address-card" /> Contact Us
            </Link>
          </li>
          <li className={styles.sideNavItem}>
            <Link href="/pages/wishlist" onClick={() => closeMenuButton.current.click()}>
              <FontAwesomeIcon icon="fa-solid fa-heart" /> Wishlist
            </Link>
          </li>
          <li className={styles.sideNavItem}>
            <Link href="/pages/sign" onClick={() => closeMenuButton.current.click()}>
              <FontAwesomeIcon icon="fa-solid fa-user" /> {user != null ? "My account" : "Sign in"}
            </Link>
          </li>
        </div>
      </div>
    </div>
  );
}

export default function Nav() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      let token = localStorage.getItem('token');

      if (!token) {
          token = sessionStorage.getItem('token');
      }

      const res = await fetch("/api/user", {
          headers: {
              'Authorization': `${token}`
          }
      });

      const data = await res.json();
      setUser(data.user);
    };
    fetchUser();
  }, []);

  return (
    <div className={styles.main}>
      <Nav1 user={user}/>
      <Nav2 user={user}/>
    </div>
  );
}
