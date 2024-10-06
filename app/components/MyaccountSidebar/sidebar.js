import styles from "./sidebar.module.css";
import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MyaccountSidebar(props) {
    const num = props.num; //color
    return (
        <div className = {styles.SideBar}>
            <Link href = "/pages/myaccount" style={num ==  1? {color: "red"} : {} }>AccountDetails</Link>
            <Link href = "/pages/myaccount/orders" style={num ==  2? {color: "red"} : {} }>Orders</Link>
            <Link href = "/" style={num ==  3? {color: "red"} : {} }>Logout</Link>
        </div>


    )
}