'use client'
import '../../globals.css';
import styles from "./page.module.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { library } from '@fortawesome/fontawesome-svg-core'

import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import Link from "next/link";

library.add(fab, fas, far);

import Footer from "@/app/components/Footer/footer"
import Nav from "@/app/components/Nav/nav"

import { useEffect, useRef } from 'react';


function Forms() {
    return (
        <div className={styles.forms}>
            <div className={styles.sign__blog}>
                <form method="post" action="" className={styles.signin}>

                    <div className={styles.profile__img__blog}>
                        <FontAwesomeIcon icon="fa-solid fa-circle-user fa-9x" style={{color: "#eea004"}} />
                    </div>

                    <h2 className={styles.title}>Sign in</h2>

                    <div className={styles.input__blog}>
                        <div className={styles.iconContainer}>
                            <FontAwesomeIcon icon="fas fa-user" />
                        </div>
                        <input type="text" placeholder="Username" />
                    </div>

                    <div className={styles.input__blog}>
                        <div className={styles.iconContainer}>
                            <FontAwesomeIcon icon="fas fa-lock" />
                        </div>
                        <input type="password" placeholder="Password" />
                    </div>

                    <input type="submit" value="Login" className={`${styles.formBtn} ${styles.login}`} />

                </form>

                <form method="post" action="" className={styles.register}>
                    <div className={styles.profile__img__blog}>
                        <FontAwesomeIcon icon="fa-solid fa-circle-user fa-9x" style={{color: "#eea004"}} />
                    </div>
                    
                    <h2 className={styles.title}>Register</h2>        

                    <div className={styles.input__blog}>
                        <div className={styles.iconContainer}>
                            <FontAwesomeIcon icon="fas fa-user" />
                        </div>
                        <input type="text" placeholder="Username" />
                    </div>               

                    <div className={styles.input__blog}>
                        <div className={styles.iconContainer}>
                            <FontAwesomeIcon icon="fas fa-envelope" />
                        </div>
                        <input type="text" placeholder="e-mail" />
                    </div>                    

                    <div className={styles.input__blog}>
                        <div className={styles.iconContainer}>
                            <FontAwesomeIcon icon="fas fa-phone" />
                        </div>
                        <input type="number" placeholder="Phone number" />
                    </div>                   

                    <div className={styles.input__blog}>
                        <div className={styles.iconContainer}>
                            <FontAwesomeIcon icon="fas fa-lock" />
                        </div>
                        <input type="password" placeholder="Password" />
                    </div>                  

                    <input type="submit" value="Register" className={`${styles.formBtn} ${styles.login}`} />

                </form>
            </div>
        </div>
    )
}


export default function Page() {

    const container = useRef();
    const registerBtn = useRef();

    function changeToSignIn() {
        container.current.classList.remove(styles.signupMode);
    }

    function changeToRegister(e) {
        container.current.classList.add(styles.signupMode);

        const button = registerBtn.current;
        const rect = button.getBoundingClientRect(); // to get element's position
    
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
    
        const ripple = document.createElement('span');
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        button.appendChild(ripple);
    
        setTimeout(() => {
          ripple.remove();
        }, 750);
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
          import('bootstrap/dist/js/bootstrap.bundle.min.js');
        }
    }, []);

    return (
        <>
            <Nav />
            <div className={styles.mainContainer} ref={container} > 
                <Forms />
                <div className={styles.panels__blog}>
                    <div className={`${styles.panel} ${styles.left__panel}`}>
                        <div className={styles.content}>
                            <h3 className={styles.panel__title}>New here ?</h3>
                            <p className={styles.panel__text}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex fuga minima iure optio repudiandae ipsum?</p>
                            <button className={`${styles.formBtn} ${styles.transparent}`} id="register__btn" onClick={changeToRegister} ref={registerBtn} >Register</button>
                        </div>

                        <img src="https://www.boltkargo.com.tr/img/icon-2.svg" alt="" className={styles.panel__img} />
                    </div>

                    <div className={`${styles.panel} ${styles.right__panel}`}>
                        <div class={styles.content}>
                            <h3 className={styles.panel__title}>Already have account</h3>
                            <p className={styles.panel__text}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex fuga minima iure optio repudiandae ipsum?</p>
                            <button className={`${styles.formBtn} ${styles.transparent}`} id="signin__btn" onClick={changeToSignIn} >Sign in</button>
                        </div>

                        <img src="../img.png" alt="" className={styles.panel__img} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}