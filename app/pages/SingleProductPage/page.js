import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "@/app/components/Nav/nav";
import Carousel from "../../components/Carousel/carousel";
import styles from "./page.module.css";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { library } from "@fortawesome/fontawesome-svg-core";

import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import Card from "@/app/components/Card/card";
import Footer from "@/app/components/Footer/footer";

library.add(fab, fas, far);

export default function Main() {
  return (
    <>
      <Nav />
      <div className={styles.container}>
        <Carousel />
        <div className={styles.main}>
          <h1 id={styles.h1}>
            Relay Module (5V-10A) 4Channel (Low level trigger) <br />
            <span>status</span>
          </h1>
          <span className={styles.price}>EGP 130.00</span>
          <div className={styles.addBox}>
            <div className={styles.counter}>
              <button className={styles.remove}>-</button>
              <span>1</span>
              <button className={styles.add}>+</button>
            </div>
            <button className={styles.addButton}>Add to cart</button>
            <button className={styles.favourites}>
              <FontAwesomeIcon
                icon="fa-heart"
                style={{
                  color: "white",
                  backgroundColor: "black",
                  padding: "5px",
                  borderRadius: "50%",
                }}
              ></FontAwesomeIcon>
              <p
                style={{
                  display: "inline",
                }}
              >
                ` Add to Wishlist`
              </p>
            </button>
          </div>
          <div className={styles.categories}>
            <div>Categories: </div>
            <div>Categories</div>
            <div>, Categories</div>
            <div>, Categories</div>
            <div>, Categories</div>
          </div>
        </div>
      </div>
      <ul className={styles.descRevUl}>
        <a href="/" className={styles.active}>
          <li>Description</li>
        </a>
        <a href="/">
          <li>Reviews (0)</li>
        </a>
      </ul>
      <hr
        style={{ width: "77%", margin: "auto", marginTop: "10px !important" }}
      />
      <div className={styles.description}>
        This relay module consists of 4 relays. Each relay is connected to a
        current buffer so that you can connect them directly to a
        Microcontroller or Arduino. Using these relays you can easily control
        high power devices or appliances using arduino or microcontrollers, the
        relay is rated for 230V 10Amps. The Module has 5 LED’s, one for power
        and 4 for indicating relay signals.
      </div>
      <div
        style={{
          width: "77%",
          margin: "auto",
          marginTop: "10px",
          fontWeight: "bold",
        }}
      >
        specifications
      </div>
      <div
        style={{
          lineHeight: "2",
          width: "77%",
          margin: "auto",
          marginTop: "10px !important",
        }}
      >
        Rating: 10A (250V AC or 30 V DC) <br /> Input (Control) voltage: 5V DC
      </div>
      <div
        style={{
          fontWeight: "bold",
          lineHeight: "2",
          width: "77%",
          margin: "auto",
          marginTop: "10px !important",
        }}
      >
        How to connect
        <br />
        The connections to your Arduino (or microcontroller) side:
      </div>
      <ul
        style={{
          lineHeight: "2",
          width: "77%",
          margin: "auto",
          marginTop: "10px !important",
        }}
      >
        <li>VCC – supply voltage. 5V from my Arduino.</li>
        <li>
          IN1 – set to HIGH to set the relay to its “default” state, set to LOW
          to switch the relay to its alternate state
        </li>
        <li>IN2 – same as IN1, but controls the second relay on the board</li>
        <li>IN3 – same as IN1, but controls the second relay on the board</li>
        <li>IN4 – same as IN1, but controls the second relay on the board</li>
        <li>GND – ground</li>
      </ul>
      <h4 style={{ width: "77%", margin: "auto", marginTop: "30px" }}>
        Related products
      </h4>
      <div className={styles.productContainer}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <Footer />
    </>
  );
}
