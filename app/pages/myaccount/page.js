'use client'
import MyaccountSidebar from "@/app/components/MyaccountSidebar/sidebar";

import styles from "./page.module.css"
import { useSelector } from "react-redux";
import Error from "../Error/page";

export default function AccountDetails () {
    const user = useSelector((state) => state.userData.data);

    if (!user) {
        return <Error />;
    }
    
    return(
        <div className={`container ${styles.AccountDetails}`} style={{minHeight : "500px"}}>
            <MyaccountSidebar num ={1} />
            <form action = "">
                <label>First name</label>
                <input type = "text" /> <br/>
                <label>Last name</label>
                <input type = "text"/> <br/>
                <label>Street address</label>
                <input type = "text"/> <br/>
                <label>Town / City</label>
                <input type = "text"/> <br/>
                <label>Country / State</label>
                <input type = "text"/> <br/>
                <label>User name</label>
                <input type = "text" disabled/> <br/>
                <label >Email address</label>
                <input type = "text"/> <br/>
                <label>Current password (leave blank to leave unchanged)</label>
                <input type = "text"/> <br/>
                <label>New password (leave blank to leave unchanged)</label>
                <input type = "text"/> <br/>
                <label>Confirm new password</label>
                <input type = "text"/> <br/>
                <input type = "submit" value = "Save Changes" className = {styles.sumbit}/>
            </form>
        </div>
    )
}