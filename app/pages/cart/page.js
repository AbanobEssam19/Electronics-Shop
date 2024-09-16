'use client'
import '../../globals.css';
import styles from "./page.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { library } from '@fortawesome/fontawesome-svg-core'

import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import Link from "next/link";

library.add(fab, fas, far);

import Nav from '@/app/components/Nav/nav';
import Footer from '@/app/components/Footer/footer';
import ProgressBar from '@/app/components/ProgressBar/bar';


export default function ShoppingCart() {
    return (
        <>
            <Nav />
            <div className={`container ${styles.main}`} >
                <ProgressBar step={1} />
            </div>
            <Footer />
        </>
    )
}