'use client'
import '../../globals.css';
import styles from "./page.module.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { library } from '@fortawesome/fontawesome-svg-core'

import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import Link from "next/link";

library.add(fab, fas, far);

import Footer from "@/app/components/Footer/footer"
import Nav from "@/app/components/Nav/nav"

import { useEffect, useRef, useState } from 'react';

function Register({setErrorText}) {

    const usernameRegex = /^[a-zA-Z0-9]{5,20}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const phoneRegex = /^01[0-2,5]{1}[0-9]{8}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    
    const modalButton = useRef();

    async function Sign(e) {
        e.preventDefault();
        let userData = {
            username: username,
            password: password,
            email: email,
            phone: phone
        };

        if (!usernameRegex.test(username)) {
            setErrorText("Username must be 5-20 characters long and contain only letters and numbers.");
            modalButton.current.click();
            return;
        }
        
        if (!emailRegex.test(email)) {
            setErrorText("Entered email is not valid!");
            modalButton.current.click();
            return;
        }
        
        if (!phoneRegex.test(phone)) {
            setErrorText("Entered phone number is not valid!");
            modalButton.current.click();
            return;
        }
        
        if (!passwordRegex.test(password)) {
            setErrorText("Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, and one digit.");
            modalButton.current.click();
            return;
        }

        const res = await fetch('/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await res.json();
        if (data.success) {
            window.location.href = "/";
        } else {
            setErrorText("The entered username already exist!");
            modalButton.current.click();
            return;
        }

    }
    

    return (
        <form method="post" action="" className={styles.register}>
            <div className={styles.profile__img__blog}>
                <FontAwesomeIcon icon="fa-solid fa-circle-user fa-9x" style={{color: "#eea004"}} />
            </div>
            
            <h2 className={styles.title}>Register</h2>        

            <div className={styles.input__blog}>
                <div className={styles.iconContainer}>
                    <FontAwesomeIcon icon="fas fa-user" />
                </div>
                <input type="text" placeholder="Username" onChange={(e) => {setUsername(e.target.value)}} />
            </div>               

            <div className={styles.input__blog}>
                <div className={styles.iconContainer}>
                    <FontAwesomeIcon icon="fas fa-envelope" />
                </div>
                <input type="text" placeholder="e-mail" onChange={(e) => {setEmail(e.target.value)}} />
            </div>                    

            <div className={styles.input__blog}>
                <div className={styles.iconContainer}>
                    <FontAwesomeIcon icon="fas fa-phone" />
                </div>
                <input type="text" placeholder="Phone number" onChange={(e) => {setPhone(e.target.value)}} />
            </div>                   

            <div className={styles.input__blog}>
                <div className={styles.iconContainer}>
                    <FontAwesomeIcon icon="fas fa-lock" />
                </div>
                <input type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} />
            </div>                  

            <input type="submit" value="Register" className={`${styles.formBtn} ${styles.login}`} onClick={Sign} />


            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#register" ref={modalButton} style={{display: "none"}}></button>

        </form>
    )
}

function Login({setErrorText}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const modalButton = useRef();

    async function LogIn(e) {
        e.preventDefault();
        let userData = {
            username: username,
            password: password
        };

        const res = await fetch('/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await res.json();
        if (data.success) {
            window.location.href = "/";
        } else {
            setErrorText("Wrong username or password!");
            modalButton.current.click();
            return;
        }

    }
    

    return (
        <form method="post" action="" className={styles.signin}>

            <div className={styles.profile__img__blog}>
                <FontAwesomeIcon icon="fa-solid fa-circle-user fa-9x" style={{color: "#eea004"}} />
            </div>

            <h2 className={styles.title}>Sign in</h2>

            <div className={styles.input__blog}>
                <div className={styles.iconContainer}>
                    <FontAwesomeIcon icon="fas fa-user" />
                </div>
                <input type="text" placeholder="Username" onChange={(e) => {setUsername(e.target.value)}} />
            </div>

            <div className={styles.input__blog}>
                <div className={styles.iconContainer}>
                    <FontAwesomeIcon icon="fas fa-lock" />
                </div>
                <input type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} />
            </div>

            <input type="submit" value="Login" className={`${styles.formBtn} ${styles.login}`} onClick={LogIn} />
            
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#register" ref={modalButton} style={{display: "none"}}></button>

        </form>
    )
}


function Forms({setErrorText}) {

    return (
        <div className={styles.forms}>
            <div className={styles.sign__blog}>
                <Login setErrorText={setErrorText} />
                <Register setErrorText={setErrorText} />
            </div>
        </div>
    )
}


export default function Page() {

    const container = useRef();
    const registerBtn = useRef();
    const [errorText, setErrorText] = useState();

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
                <Forms setErrorText={setErrorText} />
                <div className="modal" id="register">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <p>{errorText}</p>
                            </div>

                            <div className="modal-footer" style={{border: "none"}}>
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            </div>

                        </div>
                    </div>
                </div>
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