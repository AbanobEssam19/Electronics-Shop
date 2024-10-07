import MyaccountSidebar from "@/app/components/MyaccountSidebar/sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./page.module.css";
import { library } from "@fortawesome/fontawesome-svg-core";

import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(fab, fas, far);

function OrderDetails () {
    return (
        <div className= {styles.OrderDetails}>
            <p style = {{color: "red"}}>#12323</p>
            <p style = {{color: "grey"}}>September 15,2024 </p>
            <p style = {{color: "grey"}}>Cancelled</p>
            <p style = {{color: "black"}}>5000 <span style = {{color: "grey"}}>for 3 items</span></p>
        </div>
    )
}


export default function Orders () {
    return(
        <div className={`container ${styles.Orders}`} style={{minHeight : "500px"}}>
            <MyaccountSidebar num ={2}/>
            <div className = {styles.OrderIcons}>
                <div className = {styles.OrderText}>
                    <p>ORDER</p>
                    <p>DATE</p>
                    <p>STATUS</p>
                    <p>TOTAL</p>
                </div>
                <OrderDetails/> 
            </div>

        </div>


    )
    

}